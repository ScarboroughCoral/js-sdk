import { WalletAdapter, WalletAdapterOptions } from "./adapter";
import { BrowserProvider, ethers, getAddress } from "ethers";

export interface EtherAdapterOptions {
  provider: any;
  label?: string;
  // getAddresses?: (address: string) => string;
  chain: { id: string };
}

export class EtherAdapter implements WalletAdapter {
  private provider?: BrowserProvider;
  private _chainId: number;
  private _address: string;
  constructor(options: WalletAdapterOptions) {
    console.log("EtherAdapter constructor", options);
    this._chainId = parseInt(options.chain.id, 16);
    this.provider = new BrowserProvider(options.provider, "any");
    this._address = options.address;
  }
  getBalance(address: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deposit(from: string, to: string, amount: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  // getAddresses(address: string): string {
  //   return getAddress(address);
  // }

  get chainId(): number {
    return this._chainId;
  }

  get addresses(): string {
    return this._address;
  }

  async send(
    method: string,
    params: Array<any> | Record<string, any>
  ): Promise<any> {
    return await this.provider?.send(method, params);
  }

  async verify(
    data: { domain: any; message: any; types: any },
    signature: string
  ) {
    const { domain, types, message } = data;

    const recovered = ethers.verifyTypedData(domain, types, message, signature);

    console.log("recovered", recovered);
  }
}
