export interface IRequestProvider {
  get(url: string): Promise<any>;
}
