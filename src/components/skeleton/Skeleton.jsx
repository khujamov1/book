import React from "react";

export const Skeleton = () => {
	return (
		<div className="border border-blue-300 shadow p-4 w-[295px] h-[365px] rounded-[22px]">
			<div className="animate-pulse flex space-x-4">
				<div className="flex-1 space-y-6 py-1 pb-[100px]">
					<div className="h-[224px] bg-slate-200 rounded"></div>
					<div className="space-y-3">
						<div className="h-2 bg-slate-200 rounded w-1/2"></div>
						<div className="h-2 bg-slate-200 rounded w-1/3"></div>
					</div>
				</div>
			</div>
		</div>
	);
};
