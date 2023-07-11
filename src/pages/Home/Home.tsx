import { ZodString, z } from 'zod';
import { PromptTemplate } from 'langchain/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { Button, Divider, Flex, Heading, VStack, Text, Input, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import TodayInHistory from './TodayInHistory';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import OpenAI from '../../lib/OpenAI'

interface IFields {
	file: FileList;
	questions: { text: string }[];
}

interface IAnswers {
    [key: string]: string;
}

const Home = () => {
    const [answers, setAnswers] = useState<IAnswers>();
	const form = useForm<IFields>({
		defaultValues: {
			questions: [{ text: 'What color is the sky?' }],
		},
		mode: 'onChange',
	});

	const { control, handleSubmit, register } = form;

	const { append, fields, remove } = useFieldArray({
		control,
		name: 'questions',
	});

	const queryAI = async (data: IFields) => {
        // I'm sure there's a better way to do this but I'm very new to Zod
        const zodObject: {[key: number]: ZodString} = {};
        for (let i = 0; i < Object.values(data.questions).length; i ++) {
            zodObject[i] = z.string().describe(`Answer to the following question: ${Object.values(data.questions)[i].text}`);
        }

        const parser = StructuredOutputParser.fromZodSchema(z.object(zodObject));
        const formatInstructions = parser.getFormatInstructions();

        const prompt = new PromptTemplate({
            template: "Answer the user's questions as best as possible.\n{format_instructions}",
            inputVariables: [],
            partialVariables: { format_instructions: formatInstructions },
        });

        setAnswers({});

        const input = await prompt.format({});
        const response = await OpenAI.call(input);
        console.log('response', response);
	};

	const onSubmit = (event: React.FormEvent) => {
		if (event) {
			event.preventDefault();
		}

		handleSubmit(queryAI)();
	};

    console.log(answers);

	return (
		<Flex grow={1} flexDir={'column'}>
			<TodayInHistory />

			<Divider mt={4} mb={2} />

			<Heading as={'h2'} size='lg'>
				Ask the AI
			</Heading>
			<Text>As the AI as many questions as you want (within reason). Responses will be returned simultaneously.</Text>

			<Flex grow={1} flexDir={'row'} mt={4}>
				<Flex grow={1} pr={10}>
					<form onSubmit={onSubmit} style={{ display: 'flex', flexGrow: 1 }}>
						<VStack alignItems={'flex-start'} flex={1}>
							{fields.map((item, index) => (
								<Flex direction={'row'} width={'100%'} key={item.id}>
									<Input {...register(`questions.${index}.text`)} />
                                    <IconButton aria-label={'Remove'} icon={<DeleteIcon />} onClick={() => { remove(index) }} ml={2} colorScheme={'red'} />
								</Flex>
							))}

                            <Button onClick={() => { append({ text: '' })}} leftIcon={<AddIcon />}>Add Question</Button>

							<Button type={'submit'} w={'100%'} colorScheme={'green'}>
								Submit
							</Button>
						</VStack>
					</form>
				</Flex>

				<Flex grow={2}>{/* Right Panel */}</Flex>
			</Flex>
		</Flex>
	);
};

export default Home;
