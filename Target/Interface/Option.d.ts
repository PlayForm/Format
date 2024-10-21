import type Option from "@playform/pipe/Target/Interface/Option.js";
import type Biome from "../Type/Biome.js";
/**
 * @module Option
 *
 */
export default interface Interface extends Option {
    Biome?: boolean | Biome;
}
