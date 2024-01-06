import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="p-5 border-b-2 flex flex-row">
      <h1 className="py-4 px-0 font-blog text-3xl">Decentralize Lottery</h1>
      <div className="ml-auto py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
