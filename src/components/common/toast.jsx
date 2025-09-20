"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Check, AlertCircle, Info } from "lucide-react";

let toastId = 0;

const toastStore = {
  toasts: [],
  listeners: [],
  
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  
  emit() {
    this.listeners.forEach(listener => listener(this.toasts));
  },
  
  addToast(toast) {
    const id = ++toastId;
    const newToast = { id, ...toast, createdAt: Date.now() };
    this.toasts.push(newToast);
    this.emit();
    
    // Auto remove after duration
    setTimeout(() => {
      this.removeToast(id);
    }, toast.duration || 3000);
    
    return id;
  },
  
  removeToast(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.emit();
  }
};

// Toast hook
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toastStore.subscribe(setToasts);
    return unsubscribe;
  }, []);

  const toast = useCallback((options) => {
    return toastStore.addToast(options);
  }, []);

  const success = useCallback((message, options = {}) => {
    return toast({ type: 'success', message, ...options });
  }, [toast]);

  const error = useCallback((message, options = {}) => {
    return toast({ type: 'error', message, ...options });
  }, [toast]);

  const info = useCallback((message, options = {}) => {
    return toast({ type: 'info', message, ...options });
  }, [toast]);

  const dismiss = useCallback((id) => {
    toastStore.removeToast(id);
  }, []);

  return { toasts, toast, success, error, info, dismiss };
};

// Toast component
const Toast = ({ toast, onDismiss }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`
      max-w-sm w-full rounded-lg border shadow-lg p-4 pointer-events-auto
      transform transition-all duration-300 ease-in-out
      ${getStyles()}
    `}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium">
            {toast.message}
          </p>
          {toast.description && (
            <p className="mt-1 text-sm opacity-80">
              {toast.description}
            </p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={() => onDismiss(toast.id)}
            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast container component
export const ToastContainer = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={dismiss}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
