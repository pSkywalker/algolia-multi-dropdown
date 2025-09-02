import {AlgoliaPlugin} from "./AlgoliaPlugin" ;

export interface SearchInstance {
  id: string;
  indexName: string;
  searchTerm: string;
  plugins?: AlgoliaPlugin[]; // plugins specific to this instance
  onResults?: (result: any) => void;
}