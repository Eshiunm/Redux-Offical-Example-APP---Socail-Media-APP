import { configureStore } from "@reduxjs/toolkit";
import type { Action } from "@reduxjs/toolkit"; // TypeScript 3.8+ 引入的功能，可以只匯入型別定義，且不會出現在編譯後的 JS 中

interface CounterState {
  value: number
}

// 這是一個 slice reducer 函式的範例，展示 Redux reducer 內部是如何運作的，我們很快就會用真正的應用邏輯取代它。
function counterReducer(state: CounterState = { value: 0 }, action: Action) {
  switch (action.type) {
    // Handle actions here
    default: {
      return state
    }
  }
}

export const store = configureStore({
  // Pass in the 「root reducer setup」 as the `reducer` argument
  reducer: {
    // 宣告 `state.counter` 的內容值，是由 `counterReducer` 函數負責更新
    counter: counterReducer
  }
})