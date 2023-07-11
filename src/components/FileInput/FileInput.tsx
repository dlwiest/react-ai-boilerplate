import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IFileInputProps {
	fieldName: string;
    form: UseFormReturn<any, any, undefined>;
	label: string;
	required: boolean | string;
}

const FileInput = ({ fieldName, form, label, required }: IFileInputProps) => {
    const { formState: { errors }, getValues, register, watch } = form;
    const { ref, ...rest } = register(fieldName, { required });
    watch(fieldName);

    const uploadRef = useRef<HTMLInputElement | null>();

	return (
		<FormControl>
			<FormLabel htmlFor={fieldName}>{label}</FormLabel>
			<Input
				id={'file'}
				type={'file'}
				accept={'.pdf'}
				multiple={false}
				{...rest}
				ref={(e: HTMLInputElement) => {
					ref(e);
					uploadRef.current = e;
				}}
				hidden
			/>

			<Input
				placeholder={getValues('file')?.[0]?.name || 'Select a file'}
				onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
					e.target.blur();
					uploadRef.current?.click();
				}}
				cursor={'pointer'}
				isInvalid={!!errors.file}
				errorBorderColor={'crimson'}
			/>
		</FormControl>
	);
};

export default FileInput;
