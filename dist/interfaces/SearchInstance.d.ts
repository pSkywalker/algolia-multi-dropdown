import { AlgoliaPlugin } from "./AlgoliaPlugin";
export interface SearchInstance {
    id: string;
    indexName: string;
    searchTerm: string;
    plugins?: AlgoliaPlugin[];
    onResults?: (result: any) => void;
}
//# sourceMappingURL=SearchInstance.d.ts.map