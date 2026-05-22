import { ref } from 'vue'

const toasts = ref([])
let nextId = 0

/**
 * useToast — Singleton toast notification manager.
 *
 * @returns {{
 *   toasts: import('vue').Ref<Array<{id: number, message: string, type: string}>>,
 *   addToast: (message: string, type?: string, duration?: number) => number,
 *   removeToast: (id: number) => void,
 * }}
 */
export function useToast() {
  /**
   * Add a toast notification.
   * @param {string} message - Toast text content
   * @param {'success'|'error'|'warning'|'info'} [type='info'] - Visual style
   * @param {number} [duration=3000] - Auto-dismiss timeout in ms (0 = persistent)
   * @returns {number} toast id (for use with removeToast)
   */
  function addToast(message, type = 'info', duration = 3000) {
    const id = nextId++
    toasts.value.push({ id, message, type })
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
    return id
  }

  /**
   * Remove a toast by id.
   * @param {number} id - Toast id returned from addToast
   */
  function removeToast(id) {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx > -1) toasts.value.splice(idx, 1)
  }

  return { toasts, addToast, removeToast }
}
