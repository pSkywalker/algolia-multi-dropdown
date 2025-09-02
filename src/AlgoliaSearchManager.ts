
import {algoliasearch, SearchClient } from 'algoliasearch';
import { SearchInstance } from './interfaces/SearchInstance';

export class AlgoliaSearchManager {
  private client: SearchClient;
  private instances: Map<string, SearchInstance> = new Map();

  constructor(appId: string, apiKey: string) {
    this.client = algoliasearch(appId, apiKey);
  }

  /** Add a dropdown instance */
  addInstance(instance: SearchInstance) {
    if (this.instances.has(instance.id)) return;
    this.instances.set(instance.id, instance);
  }

  /** Remove a dropdown instance */
  removeInstance(id: string) {
    this.instances.delete(id);
  }

  /** Update search term and optionally trigger search */
  async updateSearchTerm(id: string, searchTerm: string, autoSearch = true) {
    const instance = this.instances.get(id);
    if (!instance) return;

    instance.searchTerm = searchTerm;

    if (autoSearch) {
      await this.search(id);
    }
  }

  /** Trigger search for a specific instance */
  async search(id: string) {
    const instance = this.instances.get(id);
    if (!instance) return;

    // Run beforeSearch hooks for instance-specific plugins
    if (instance.plugins) {
      for (const plugin of instance.plugins) {
        if (plugin.beforeSearch) await plugin.beforeSearch(instance);
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