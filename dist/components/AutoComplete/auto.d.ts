import React, { FC, InputHTMLAttributes, ReactElement, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    ChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
}
interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggessions: (str: string) => string[];
    onSelect?: (item: string) => void;
    renderOption?: (item: string) => React.ReactElement;
}
declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
