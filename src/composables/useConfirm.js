// Pairs with IosAlert.vue for promise-based confirm dialogs.
// Uses the IosAlert v-model (visible) pattern to show/hide.
// Returns a Promise that resolves true (confirm) or false (cancel).

import { reactive } from 'vue'

const state = reactive({
  visible: false,
  title: '确认',
  message: '',
  confirmText: '确定',
  cancelText: '取消',
  confirmStyle: 'default', // 'default' | 'destructive'
  resolve: null,
})

/**
 * @typedef {Object} ConfirmOptions
 * @property {string}  [title='确认']       - Dialog title
 * @property {string}  [message='']         - Dialog body message
 * @property {string}  [confirmText='确定']  - Confirm button label
 * @property {string}  [cancelText='取消']   - Cancel button label
 * @property {'default'|'destructive'} [confirmStyle='default'] - Confirm button style
 */

/**
 * useConfirm — Promise-based confirm dialog.
 * Pairs with IosAlert.vue via the `state` object.
 *
 * @returns {{
 *   state: import('vue').UnwrapNestedRefs<{
 *     visible: boolean,
 *     title: string,
 *     message: string,
 *     confirmText: string,
 *     cancelText: string,
 *     confirmStyle: string,
 *     resolve: Function|null,
 *   }>,
 *   confirm: (options?: ConfirmOptions) => Promise<boolean>,
 *   handleConfirm: () => void,
 *   handleCancel: () => void,
 * }}
 */
export function useConfirm() {
  /**
   * Show the confirm dialog. Returns a Promise that resolves to true (confirm) or false (cancel).
   * @param {ConfirmOptions} [options={}]
   * @returns {Promise<boolean>}
   */
  function confirm(options = {}) {
    // Clean up any pending resolve
    if (state.resolve) {
      state.resolve(false)
      state.resolve = null
    }
    return new Promise((resolve) => {
      state.visible = true
      state.title = options.title || '确认'
      state.message = options.message || ''
      state.confirmText = options.confirmText || '确定'
      state.cancelText = options.cancelText || '取消'
      state.confirmStyle = options.confirmStyle || 'default'
      state.resolve = resolve
    })
  }

  function handleConfirm() {
    state.visible = false
    if (state.resolve) {
      state.resolve(true)
      state.resolve = null
    }
  }

  function handleCancel() {
    state.visible = false
    if (state.resolve) {
      state.resolve(false)
      state.resolve = null
    }
  }

  return { state, confirm, handleConfirm, handleCancel }
}
