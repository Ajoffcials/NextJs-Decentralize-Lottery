import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../../constants/index";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrance() {
  const { chainId: chainIdhex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdhex);
  const raffleAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;

  const [entranceFee, setEntranceFee] = useState("0");
  const [numPlayers, setPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const dispatch = useNotification();

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });
  const { runContractFunction: getWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getWinner",
    params: {},
  });

  async function updateUi() {
    const entranceFeeRes = (
      await getEntranceFee({
        onError: (error) => console.log(error),
      })
    ).toString();
    setEntranceFee(entranceFeeRes);
    console.log(ethers.utils.formatUnits(entranceFeeRes, "ether"));

    const getNumberOfPlayersRes = (
      await getNumberOfPlayers({
        onError: (error) => console.log(error),
      })
    ).toString();
    setPlayers(getNumberOfPlayersRes);

    const getWinnerRes = (
      await getWinner({
        onError: (error) => console.log(error),
      })
    ).toString();
    setRecentWinner(getWinnerRes);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUi();
    }
  }, [isWeb3Enabled]); //this starts as false

  const handleSuccess = async function (tx) {
    await tx.wait(1);
    handleNotification(tx);
    updateUi();
  };

  const handleNotification = function () {
    dispatch({
      type: "info",
      message: "transaction  Complete!",
      title: "Tx Notification",
      position: "topR",
      // icon: "bell",
    });
  };
  return (
    <div className="p-5">
      Hi from Lottery Entrance
      {raffleAddress ? (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async () =>
              await enterRaffle({
                // onComplete:
                // onError:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              })
            }
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Enter Raffle"
            )}
          </button>
          <div>Entrance Fee: {ethers.utils.formatEther(entranceFee)} ETH</div>
          <div>Number Of Players: {numPlayers}</div>
          <div>Recent Winner: {recentWinner}</div>
        </div>
      ) : (
        <div>
          No address Found
          <div>whapppp</div>
        </div>
      )}
    </div>
  );
}
