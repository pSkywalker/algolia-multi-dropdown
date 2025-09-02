import { SearchInstance } from './interfaces/SearchInstance';
export declare class AlgoliaSearchManager {
    private client;
    private instances;
    constructor(appId: string, apiKey: string);
    /** Add a dropdown instance */
    addInstance(instance: SearchInstance): void;
    /** Remove a dropdown instance */
    removeInstance(id: string): void;
    /** Update search term and optionally trigger search */
    updateSearchTerm(id: string, searchTerm: string, autoSearch?: boolean): Promise<void>;
    /** Trigger search for a specific instance */
    search(id: string): Promise<void>;
}
//# sourceMappingURL=AlgoliaSearchManager.d.ts.map