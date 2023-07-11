import React, { useEffect, useState } from 'react'
import { Text } from '@chakra-ui/react'
import OpenAI from '../../lib/OpenAI'

const TodayInHistory = () => {
	const [eventText, setEventText] = useState('')

	const populateText = async () => {
		try {
			const res = await OpenAI.call(
				`Today is ${new Date().toLocaleDateString()}. In a sentence or two, describe one important event that happened today in history."`
			)
			setEventText(res)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		populateText()
	}, [])

	return <Text>{eventText}</Text>
}

export default TodayInHistory
