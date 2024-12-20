"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";

export default function Demo(
	{ title }: { title?: string } = { title: "Frames v2 Demo" },
) {
	console.log(title);
	const [isSDKLoaded, setIsSDKLoaded] = useState(false);
	useEffect(() => {
		const load = async () => {
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
				src="https://dweb.mypinata.cloud/ipfs/QmbcdMc3nWcdyu82kfvfSc4Nhu1bJJfmoiEBTVuPjxf5SY"
				title="Frame content"
				className="h-full w-full"
			/>
		</div>
	);
}
