import { onUnmounted, onMounted } from "vue";

export const useEventListener = (target: EventTarget, event: string, callBack: (event: MouseEvent) => void) => {
  onMounted(() => target.addEventListener(event, callBack))
  onUnmounted(() => target.removeEventListener(event, callBack))
}