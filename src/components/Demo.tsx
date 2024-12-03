"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
	FrameNotificationDetails,
	type FrameContext,
} from "@farcaster/frame-sdk";
import {
	useAccount,
	useSendTransaction,
	useSignMessage,
	useSignTypedData,
	useWaitForTransactionReceipt,
	useDisconnect,
	useConnect,
	useSwitchChain,
	useChainId,
} from "wagmi";

import { config } from "~/components/providers/WagmiProvider";
import { Button } from "~/components/ui/Button";
import { truncateAddress } from "~/lib/truncateAddress";
import { base } from "wagmi/chains";

export default function Demo(
	{ title }: { title?: string } = { title: "Frames v2 Demo" },
) {
	const [isSDKLoaded, setIsSDKLoaded] = useState(false);
	const [context, setContext] = useState<FrameContext>();
	const [isContextOpen, setIsContextOpen] = useState(false);
	const [txHash, setTxHash] = useState<string | null>(null);
	const [addFrameResult, setAddFrameResult] = useState("");
	const [notificationDetails, setNotificationDetails] =
		useState<FrameNotificationDetails | null>(null);
	const [sendNotificationResult, setSendNotificationResult] = useState("");

	const { address, isConnected } = useAccount();
	const chainId = useChainId();

	const {
		sendTransaction,
		error: sendTxError,
		isError: isSendTxError,
		isPending: isSendTxPending,
	} = useSendTransaction();

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash: txHash as `0x${string}`,
		});

	const {
		signTypedData,
		error: signTypedError,
		isError: isSignTypedError,
		isPending: isSignTypedPending,
	} = useSignTypedData();

	const { disconnect } = useDisconnect();
	const { connect } = useConnect();

	useEffect(() => {
		const load = async () => {
			setContext(await sdk.context);
			sdk.actions.ready();
		};
		if (sdk && !isSDKLoaded) {
			setIsSDKLoaded(true);
			load();
		}
	}, [isSDKLoaded]);

	return (
		<div className="w-screen h-screen">
			<iframe
				src="https://dweb.mypinata.cloud/ipfs/bafybeifm5zwjx4bskgpuznbqd5kibmiacotlmlbqwtqci74dn5dp7rmada"
				title="Frame content"
				className="h-full w-full"
			/>
		</div>
	);
}
