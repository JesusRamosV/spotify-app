"use client";
import React, { useEffect, useRef } from "react";
import { create } from "zustand";
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { AlertType } from "@/interfaces/System.interface";

interface SnackbarState {
  alerts: AlertType[];
  addAlert: (alert: AlertType) => void;
  removeAlert: () => void;
}

const AUTO_DISMISS = 3000;

export const useSnackbarStore = create<SnackbarState>((set) => ({
  alerts: [],
  addAlert: (alert) => {
    set((state) => ({
      alerts: [alert, ...state.alerts],
    }));
  },
  removeAlert: () =>
    set((state) => ({
      alerts: state.alerts.slice(0, state.alerts.length - 1),
    })),
}));

export const Snackbar: React.FC = () => {
  const { alerts, removeAlert } = useSnackbarStore();
  const snackbarsRef = useRef(null);

  useEffect(() => {
    if (alerts.length) {
      alerts.forEach((alert) => {
        if (!alert.isManual) {
          const dismissAlert = setTimeout(() => {
            removeAlert();
          }, AUTO_DISMISS);
          return () => {
            clearTimeout(dismissAlert);
          };
        }

        const handleClickOutside = (e: MouseEvent) => {
          if (
            snackbarsRef.current &&
            (snackbarsRef.current as HTMLElement).contains(e.target as Node)
          ) {
            removeAlert();
          }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      });
    }
  }, [alerts, removeAlert]);

  return (
    <div
      ref={snackbarsRef}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translate(-50%, 0)",
        zIndex: 99999,
      }}
    >
      {alerts.map((alert, index) => (
        <Toast
          key={`${alert.msg}-${index + 1}`}
          className="mb-4 w-full max-w-xs text-center"
        >
          {alert.severity === "success" ? (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
          ) : (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
          )}

          <div
            className={`ml-3 text-sm ${
              alert.severity === "success" ? "text-green-500" : "text-red-500"
            } font-bold`}
          >
            {alert.msg}
          </div>
        </Toast>
      ))}
    </div>
  );
};
