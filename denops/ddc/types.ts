import { autocmd } from "./deps.ts";
import { BaseUiParams } from "./base/ui.ts";
import { BaseSourceParams } from "./base/source.ts";
import { BaseFilterParams } from "./base/filter.ts";

export { BaseUi } from "./base/ui.ts";
export { BaseSource } from "./base/source.ts";
export { BaseFilter } from "./base/filter.ts";
export { BaseConfig } from "./base/config.ts";

export type { BaseUiParams } from "./base/ui.ts";
export type { BaseSourceParams } from "./base/source.ts";
export type { BaseFilterParams } from "./base/filter.ts";

export { ContextBuilder } from "./context.ts";

export type DdcExtType = "ui" | "source" | "filter";

export type DdcEvent =
  | autocmd.AutocmdEvent
  | "Initialize"
  | "Manual"
  | "Update";

export type UiName = string;
export type SourceName = string;
export type FilterName = string;

export type Custom = {
  source: Record<SourceName, SourceOptions>;
  option: DdcOptions;
};

export type Context = {
  changedTick: number;
  event: DdcEvent;
  filetype: string;
  input: string;
  lineNr: number;
  mode: string;
  nextInput: string;
};

export type UserSource = SourceName | {
  name: SourceName;
  options?: Partial<SourceOptions>;
  params?: BaseSourceParams;
};

export type UserFilter = FilterName | {
  name: FilterName;
  options?: FilterOptions;
  params?: BaseFilterParams;
};

export type DdcOptions = {
  autoCompleteDelay: number;
  autoCompleteEvents: DdcEvent[];
  backspaceCompletion: boolean;
  cmdlineSources: UserSource[] | Record<string, UserSource[]>;
  filterOptions: Record<FilterName, Partial<FilterOptions>>;
  filterParams: Record<FilterName, Partial<BaseFilterParams>>;
  /** @deprecated **/
  keywordPattern: string;
  postFilters: UserFilter[];
  sourceOptions: Record<SourceName, Partial<SourceOptions>>;
  sourceParams: Record<SourceName, Partial<BaseSourceParams>>;
  sources: UserSource[];
  specialBufferCompletion: boolean;
  ui: UiName;
  uiOptions: Record<UiName, Partial<UiOptions>>;
  uiParams: Record<UiName, Partial<BaseUiParams>>;
};

export type UserOptions = Record<string, unknown>;

export type UiOptions = {
  // TODO: add options and remove placeholder
  placeholder: void;
};

export type SourceOptions = {
  converters: UserFilter[];
  dup: "keep" | "force" | "ignore";
  enabledIf: string;
  forceCompletionPattern: string;
  ignoreCase: boolean;
  isVolatile: boolean;
  keywordPattern: string;
  mark: string;
  matcherKey: string;
  matchers: UserFilter[];
  maxAutoCompleteLength: number;
  maxItems: number;
  maxKeywordLength: number;
  minAutoCompleteLength: number;
  minKeywordLength: number;
  sorters: UserFilter[];
  timeout: number;
};

export type FilterOptions = {
  // TODO: add options and remove placeholder
  placeholder: void;
};

export type PumHighlight = {
  name: string;
  type: "abbr" | "kind" | "menu";
  hl_group: string;
  col: number;
  width: number;
};

export type Column = {
  name: string;
  value: string;
};

export type Item<
  UserData extends unknown = unknown,
> = {
  word: string;
  abbr?: string;
  menu?: string;
  info?: string;
  kind?: string;
  "user_data"?: UserData;
  highlights?: PumHighlight[];
  columns?: Record<string, string>;
};

export type DdcGatherItems<
  UserData extends unknown = unknown,
> = Item<UserData>[] | {
  items: Item<UserData>[];
  isIncomplete: boolean;
};

// For internal type
export type DdcUserData = unknown;

export type DdcItem =
  & Item<DdcUserData>
  & {
    __sourceName: string;
    __dup: "keep" | "force" | "ignore";
    dup: boolean;
    equal: boolean;
    icase: boolean;
  };

/**
 * NOTE: no guarantees about ordering.
 * @param id
 * @return payload
 */
export type OnCallback = (id: string) => Promise<unknown>;
export interface CallbackContext {
  emit(id: string, payload?: unknown): void;
  revoke(): void;
  createOnCallback(): OnCallback;
}
