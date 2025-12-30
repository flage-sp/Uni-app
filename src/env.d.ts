declare module 'vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  export function ref<T>(value: T): import('vue').Ref<T>
  export function reactive<T extends object>(target: T): import('vue').Reactive<T>
  export function computed<T>(getter: () => T): import('vue').ComputedRef<T>
  export function createSSRApp<T>(getter: () => T): import('vue').createSSRApp<T>
}
