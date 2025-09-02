import { SearchInstance } from "./SearchInstance";
export interface AlgoliaPlugin {
    beforeSearch?: (instance: SearchInstance) => void | Promise<void>;
    onSearchResults?: (results: any, instance: SearchInstance) => any;
}
//# sourceMappingURL=AlgoliaPlugin.d.ts.map