import Vue, { VNode } from "vue";
import { IMessage } from '@/types/message.types';
import { IElMessageBox, ElMessageBoxShortcutMethod } from '@/types/message-box.type';
import { INotification } from "@/types/notification.type";
import { Log } from "./types/log.types";
declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare var window: any;
declare var document: any;
declare var require: any;

declare module 'vue/types/vue' {
  interface Vue {
    $msgbox: IElMessageBox
    $alert: ElMessageBoxShortcutMethod
    $confirm: ElMessageBoxShortcutMethod
    $prompt: ElMessageBoxShortcutMethod
    $notify: INotification
    $message: IMessage,
    $log: Log,
    _attrs: any
  }
}