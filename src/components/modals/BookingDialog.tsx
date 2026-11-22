"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, Camera, CheckCircle2, Phone, X } from "lucide-react";
import { LocaleContent, STUDIO_CONTACTS } from "@/lib/i18n";

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  content: LocaleContent;
  initialService?: string;
  initialBackdrop?: string;
}

export function BookingDialog({
  open,
  onClose,
  content,
  initialService,
  initialBackdrop,
}: BookingDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const announcerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const modalCopy = content.bookingModal;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceOverride, setServiceOverride] = useState<string | null>(null);
  const [backdropOverride, setBackdropOverride] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const service =
    serviceOverride ?? initialService ?? modalCopy.serviceOptions[0];
  const backdrop =
    backdropOverride ?? initialBackdrop ?? modalCopy.backdropOptions[0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Safari fallback for closedby="any" + close listener cleanup
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onDialogClose = () => {
      dialog.returnValue = "";
      setSubmitted(false);
      setServiceOverride(null);
      setBackdropOverride(null);
      onClose();
    };
    dialog.addEventListener("close", onDialogClose);

    let detachClosedByFallback: (() => void) | undefined;
    if (
      typeof HTMLDialogElement !== "undefined" &&
      !("closedBy" in HTMLDialogElement.prototype)
    ) {
      const outside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect();
        return (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        );
      };
      let pressedOutside = false;
      const onDown = (e: PointerEvent) => {
        pressedOutside = outside(e);
      };
      const onUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e) && dialog.open) {
          dialog.close();
        }
      };
      dialog.addEventListener("pointerdown", onDown);
      dialog.addEventListener("pointerup", onUp);
      detachClosedByFallback = () => {
        dialog.removeEventListener("pointerdown", onDown);
        dialog.removeEventListener("pointerup", onUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", onDialogClose);
      detachClosedByFallback?.();
    };
  }, [onClose]);

  // Consistent ARIA experience synced with :user-invalid
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const flagged = new WeakSet<Element>();
    const announced = new WeakSet<Element>();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const linkError = (el: HTMLElement, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
      else el.removeAttribute("aria-describedby");
    };

    const syncAria = (el: EventTarget | null, announce = false) => {
      if (
        !(
          el instanceof HTMLInputElement ||
          el instanceof HTMLSelectElement ||
          el instanceof HTMLTextAreaElement
        )
      ) {
        return;
      }

      const supportsUserInvalid =
        typeof CSS !== "undefined" && CSS.supports("selector(:user-invalid)");
      const invalid = supportsUserInvalid
        ? el.matches(":user-invalid")
        : !el.validity.valid;

      if (invalid) {
        if (!supportsUserInvalid) {
          el.classList.add("user-invalid-fallback");
          el.classList.remove("user-valid-fallback");
        }
        el.setAttribute("aria-invalid", "true");
        linkError(el, true);
        flagged.add(el);

        if (announce && !announced.has(el) && el.dataset.error) {
          const errEl = document.getElementById(el.dataset.error);
          if (errEl && announcerRef.current) {
            announced.add(el);
            clearTimeout(timer);
            announcerRef.current.textContent = "";
            timer = setTimeout(() => {
              if (announcerRef.current) {
                announcerRef.current.textContent = errEl.textContent || "";
              }
            }, 350);
          }
        }
      } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
        if (!supportsUserInvalid) {
          el.classList.remove("user-invalid-fallback");
          el.classList.add("user-valid-fallback");
        }
        el.setAttribute("aria-invalid", "false");
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
      }
    };

    form.querySelectorAll("input, select, textarea").forEach((el) => {
      el.setAttribute("aria-invalid", "false");
    });

    const onBlur = (e: Event) => syncAria(e.target, true);
    const onInput = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.hasAttribute("aria-invalid")) syncAria(target, false);
    };
    const onInvalid = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        announced.add(e.target);
        if (
          typeof CSS !== "undefined" &&
          !CSS.supports("selector(:user-invalid)")
        ) {
          e.target.classList.add("user-invalid-fallback");
        }
        e.target.setAttribute("aria-invalid", "true");
        linkError(e.target, true);
        flagged.add(e.target);
      }
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("invalid", onInvalid, true);

    return () => {
      clearTimeout(timer);
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("invalid", onInvalid, true);
    };
  }, [submitted, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(
        ":invalid",
      ) as HTMLElement | null;
      form.querySelectorAll("input, select, textarea").forEach((field) => {
        if (
          field instanceof HTMLInputElement &&
          !field.validity.valid
        ) {
          field.classList.add("user-invalid-fallback");
          field.setAttribute("aria-invalid", "true");
          const errorId = field.dataset.error;
          if (errorId) {
            const ids = (field.getAttribute("aria-describedby") || "")
              .split(/\s+/)
              .filter((id) => id && id !== errorId);
            ids.push(errorId);
            field.setAttribute("aria-describedby", ids.join(" "));
          }
        }
      });
      firstInvalid?.focus();
      return;
    }

    setSubmitted(true);
  };

  return (
    <dialog
      ref={dialogRef}
      id="union-booking-dialog"
      className="cine-modal"
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
    >
      <div
        ref={announcerRef}
        aria-live="polite"
        className="visually-hidden"
      />

      <div className="flex items-start justify-between gap-4 border-b border-white/15 bg-[#0a0a0a] px-6 py-5">
        <div>
          <span className="inline-block rounded-full bg-[#ec521b]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#ec521b]">
            UNION STUDIO · SAMARKAND
          </span>
          <h2
            id={titleId}
            className="font-display-cine mt-2 text-3xl text-white sm:text-4xl"
          >
            {modalCopy.title}
          </h2>
          <p className="mt-1 text-sm text-[#b5b0a8]">{modalCopy.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label={modalCopy.closeLabel}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="overflow-y-auto p-6">
        {submitted ? (
          <div className="space-y-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 h-7 w-7 shrink-0 text-emerald-400"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display-cine text-3xl text-white">
                  {modalCopy.successTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#e7e2d9]">
                  {modalCopy.successBody}
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-xl border border-white/15 bg-[#0a0a0a]/70 p-4 text-sm sm:grid-cols-2">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#b5b0a8]">
                  {modalCopy.nameLabel}
                </span>
                <p className="font-semibold text-white">{name}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#b5b0a8]">
                  {modalCopy.phoneLabel}
                </span>
                <p className="font-semibold text-white">{phone}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#b5b0a8]">
                  {modalCopy.serviceLabel}
                </span>
                <p className="font-semibold text-[#ec521b]">{service}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#b5b0a8]">
                  {modalCopy.backdropLabel}
                </span>
                <p className="font-semibold text-white">{backdrop}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href={`tel:${STUDIO_CONTACTS.phone1.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-white hover:border-[#ec521b]"
                >
                  <Phone className="h-4 w-4 text-[#ec521b]" aria-hidden="true" />
                  {STUDIO_CONTACTS.phone1}
                </a>
                <a
                  href={STUDIO_CONTACTS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-white hover:border-[#ec521b]"
                >
                  <Camera
                    className="h-4 w-4 text-[#ec521b]"
                    aria-hidden="true"
                  />
                  {STUDIO_CONTACTS.instagram}
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="rounded-full bg-[#ec521b] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[#d84310] cursor-pointer"
              >
                {modalCopy.newRequestBtn}
              </button>
            </div>
          </div>
        ) : (
          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-name"
                  className="block text-sm font-semibold text-white"
                >
                  {modalCopy.nameLabel}
                </label>
                <span
                  id="booking-name-hint"
                  className="mb-1.5 block text-xs text-[#b5b0a8]"
                >
                  {modalCopy.nameHint}
                </span>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  autoFocus
                  required
                  minLength={2}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={modalCopy.namePlaceholder}
                  aria-describedby="booking-name-hint"
                  data-error="booking-name-error"
                  className="cine-input w-full rounded-xl border border-white/20 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#ec521b] focus:outline-none"
                />
                <div id="booking-name-error" className="field-error-msg">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{modalCopy.nameError}</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-sm font-semibold text-white"
                >
                  {modalCopy.phoneLabel}
                </label>
                <span
                  id="booking-phone-hint"
                  className="mb-1.5 block text-xs text-[#b5b0a8]"
                >
                  {modalCopy.phoneHint}
                </span>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  required
                  pattern="[\d\s+\-\(\)]{9,}"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={modalCopy.phonePlaceholder}
                  aria-describedby="booking-phone-hint"
                  data-error="booking-phone-error"
                  className="cine-input w-full rounded-xl border border-white/20 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#ec521b] focus:outline-none"
                />
                <div id="booking-phone-error" className="field-error-msg">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{modalCopy.phoneError}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-service"
                  className="block text-sm font-semibold text-white"
                >
                  {modalCopy.serviceLabel}
                </label>
                <span className="mb-1.5 block text-xs text-[#b5b0a8]">
                  {modalCopy.serviceHint}
                </span>
                <select
                  id="booking-service"
                  value={service}
                  onChange={(e) => setServiceOverride(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-[#0a0a0a] px-4 py-3 text-sm text-white focus:border-[#ec521b] focus:outline-none"
                >
                  {modalCopy.serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="booking-backdrop"
                  className="block text-sm font-semibold text-white"
                >
                  {modalCopy.backdropLabel}
                </label>
                <span className="mb-1.5 block text-xs text-[#b5b0a8]">
                  {modalCopy.backdropHint}
                </span>
                <select
                  id="booking-backdrop"
                  value={backdrop}
                  onChange={(e) => setBackdropOverride(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-[#0a0a0a] px-4 py-3 text-sm text-white focus:border-[#ec521b] focus:outline-none"
                >
                  {modalCopy.backdropOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-notes"
                className="block text-sm font-semibold text-white"
              >
                {modalCopy.notesLabel}
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={modalCopy.notesPlaceholder}
                className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#ec521b] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/15 pt-4">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition duration-150 hover:border-white cursor-pointer"
              >
                {modalCopy.cancelBtn}
              </button>
              <button
                type="submit"
                className="rounded-full bg-[#ec521b] px-6 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition duration-150 hover:bg-[#d84310] active:scale-[0.98] cursor-pointer"
              >
                {modalCopy.submitBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
