import * as React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type CampaignOption = {
	id: string;
	name: string;
};

type CampaignSelectProps = {
	campaigns: CampaignOption[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
};

export const CampaignSelect: React.FC<CampaignSelectProps> = ({
	campaigns,
	value,
	onChange,
	placeholder = "Select campaign",
}) => {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-full sm:w-64">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All campaigns</SelectItem>
				{campaigns.map((c) => (
					<SelectItem key={c.id} value={c.id}>
						{c.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};


