<h1>Algolia Multi Dropdown</h1>

<p>
A TypeScript utility designed to enhance Algolia's search experience by enabling multiple dropdowns with per-instance plugins. Ideal for integrating faceted search in modern web applications.
</p>

<h2>🚀 Features</h2>
<ul>
  <li><strong>Multiple Dropdowns:</strong> Manage multiple search dropdowns simultaneously.</li>
  <li><strong>Plugin Support:</strong> Each dropdown instance can have its own set of plugins, allowing for features like logging, caching, debouncing, or custom transformations of search results. Plugins are executed in a lifecycle style: <em>beforeSearch</em> hooks run before querying Algolia, and <em>onSearchResults</em> hooks run after results are returned. This makes it easy to extend functionality without modifying the core module.</li>
  <li><strong>TypeScript Support:</strong> Fully typed for better development experience.</li>
  <li><strong>Easy Integration:</strong> Simple to integrate into any modern frontend framework like Angular, React, Vue, or vanilla TypeScript.</li>
</ul>

<h2>📦 Installation</h2>
<pre><code>npm install algolia-multi-dropdown</code></pre>

<h2>⚙️ Usage</h2>

<h3>1. Initialize the Manager</h3>
<pre><code>import { AlgoliaSearchManager } from 'algolia-multi-dropdown';

const manager = new AlgoliaSearchManager('YourAppID', 'YourSearchOnlyAPIKey');
</code></pre>

<h3>2. Add a Dropdown Instance</h3>
<pre><code>manager.addInstance({
  id: 'productSearch',
  indexName: 'products',
  searchTerm: '',
  onResults: (results) =&gt; {
    console.log(results);
  },
  plugins: [
    // Add your plugins here
  ],
});
</code></pre>

<h3>3. Update Search Term</h3>
<pre><code>manager.updateSearchTerm('productSearch', 'laptop');</code></pre>

<h3>4. Trigger Search</h3>
<pre><code>manager.search('productSearch');</code></pre>

<h2>🧪 Example with Angular</h2>
<pre><code>import { Component, OnInit } from '@angular/core';
import { AlgoliaSearchService } from './algolia-search.service';

@Component({
  selector: 'app-product-search',
  template: `
    <input (input)="onSearch($event.target.value)" placeholder="Search products">
    <ul>
      <li *ngFor="let hit of results">{{ hit.name }}</li>
    </ul>
  `,
})
export class ProductSearchComponent implements OnInit {
  results: any[] = [];
  private instanceId = 'productSearch';

  constructor(private algoliaSearchService: AlgoliaSearchService) {}

  ngOnInit() {
    this.algoliaSearchService.manager.addInstance({
      id: this.instanceId,
      indexName: 'products',
      searchTerm: '',
      onResults: (res) =&gt; {
        this.results = res.results[0].hits;
      },
    });
  }

  onSearch(value: string) {
    this.algoliaSearchService.manager.updateSearchTerm(this.instanceId, value);
  }

  ngOnDestroy() {
    this.algoliaSearchService.manager.removeInstance(this.instanceId);
  }
}
</code></pre>

<h2>🧩 Plugins</h2>
<p>
Plugins provide a flexible way to customize dropdown behavior. They allow you to execute logic <strong>before</strong> a search is triggered or <strong>after</strong> results are returned. Each dropdown instance can have its own plugins, enabling different behaviors for different dropdowns on the same page. Common plugin examples include:
</p>
<ul>
  <li><strong>Logging:</strong> Log search terms or results for debugging or analytics.</li>
  <li><strong>Caching:</strong> Cache previous search results to reduce API calls.</li>
  <li><strong>Debouncing:</strong> Delay search execution until the user stops typing to reduce unnecessary requests.</li>
</ul>

<p>Example plugin:</p>
<pre><code>const logPlugin = {
  beforeSearch: (instance) =&gt; {
    console.log('Before search:', instance.searchTerm);
  },
  onSearchResults: (results, instance) =&gt; {
    console.log('Search results:', results);
    return results;
  },
};
</code></pre>

<h2>🛠️ Development</h2>
<p>To contribute or modify the package:</p>
<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/pSkywalker/algolia-multi-dropdown.git
cd algolia-multi-dropdown</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Build the package:
    <pre><code>npm run build</code></pre>
  </li>
  <li>Link the package locally:
    <pre><code>npm link</code></pre>
  </li>
  <li>In your project, link the package:
    <pre><code>npm link algolia-multi-dropdown</code></pre>
  </li>
</ol>

<h2>📄 License</h2>
<p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for details.</p>