/**
 * @module Option
 *
 */
export default interface Type extends Option {
    Biome?: boolean | Biome;
}
import type Biome from "../Type/Biome.js";
import type Option from "@playform/file-pipe/Target/Interface/Option.js";
