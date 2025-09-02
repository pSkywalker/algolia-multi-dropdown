import {SearchInstance} from "./SearchInstance";


export interface AlgoliaPlugin {
  beforeSearch?: (instance: SearchInstance) => void | Promise<void>;
  onSearchResults?: (results: any, instance: SearchInstance) => any;
}
