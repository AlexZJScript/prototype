import { FC } from "react";

import { Option as DefaultOption, OptionProps } from '@alfalab/core-components/select'

export const Option: FC<OptionProps> = ({ ...props }) => (
    <DefaultOption {...props} Checkmark={null} />
)