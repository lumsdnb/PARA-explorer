export async function summarizeText(s: string) {
	let input = `summarize the following text: ${s}`;
	console.log(input);

	let requestBody = JSON.stringify(prepareMessagePayload(input));

	try {
		const response = await fetch(`http://localhost:5000/api/v1/generate`, {
			method: 'POST',
			body: requestBody
		});
		if (!response.ok) {
			throw new Error(`API returned ${response.status} status code`);
		}
		return response.json();
	} catch (error) {
		console.log(error);
		throw error;
	}
}

function prepareMessagePayload(s: string) {
	const body = {
		prompt: s,
		max_new_tokens: 250,
		do_sample: true,
		temperature: 1.3,
		top_p: 0.1,
		typical_p: 1,
		epsilon_cutoff: 0,
		eta_cutoff: 0,
		tfs: 1,
		top_a: 0,
		repetition_penalty: 1.18,
		top_k: 40,
		min_length: 0,
		no_repeat_ngram_size: 0,
		num_beams: 1,
		penalty_alpha: 0,
		length_penalty: 1,
		early_stopping: false,
		mirostat_mode: 0,
		mirostat_tau: 5,
		mirostat_eta: 0.1,
		seed: -1,
		add_bos_token: true,
		truncation_length: 2048,
		ban_eos_token: false,
		skip_special_tokens: true,
		stopping_strings: []
	};
	return body;
}
