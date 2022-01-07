type RequestResponse = {
  data: any;
};

export interface IRequestProvider {
  get(url: string): Promise<RequestResponse>;
}
