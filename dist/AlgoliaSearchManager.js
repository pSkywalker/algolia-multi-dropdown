"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgoliaSearchManager = void 0;
const algoliasearch_1 = require("algoliasearch");
class AlgoliaSearchManager {
    client;
    instances = new Map();
    constructor(appId, apiKey) {
        this.client = (0, algoliasearch_1.algoliasearch)(appId, apiKey);
    }
    /** Add a dropdown instance */
    addInstance(instance) {
        if (this.instances.has(instance.id))
            return;
        this.instances.set(instance.id, instance);
    }
    /** Remove a dropdown instance */
    removeInstance(id) {
        this.instances.delete(id);
    }
    /** Update search term and optionally trigger search */
    async updateSearchTerm(id, searchTerm, autoSearch = true) {
        const instance = this.instances.get(id);
        if (!instance)
            return;
        instance.searchTerm = searchTerm;
        if (autoSearch) {
            await this.search(id);
        }
    }
    /** Trigger search for a specific instance */
    async search(id) {
        const instance = this.instances.get(id);
        if (!instance)
            return;
        // Run beforeSearch hooks for instance-specific plugins
        if (instance.plugins) {
            for (const plugin of instance.plugins) {
                if (plugin.beforeSearch)
                    await plugin.beforeSearch(instance);
            }
        }
        // Perform Algolia search
        let result = await this.client.search({
            requests: [{ indexName: instance.indexName, query: instance.searchTerm }],
        });
        // Run onSearchResults hooks for instance-specific plugins
        if (instance.plugins) {
            for (const plugin of instance.plugins) {
                if (plugin.onSearchResults) {
                    result = plugin.onSearchResults(result, instance) || result;
                }
            }
        }
        // Return results to instance callback
        if (instance.onResults) {
            instance.onResults(result);
        }
    }
}
exports.AlgoliaSearchManager = AlgoliaSearchManager;
//# sourceMappingURL=AlgoliaSearchManager.js.map