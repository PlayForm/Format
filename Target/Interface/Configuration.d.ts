/**
 * @module Configuration
 *
 */
export default interface Interface {
    (File: string): Promise<string>;
}
