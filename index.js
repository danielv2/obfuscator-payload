import R from 'ramda';

const obfuscateParams = ['card_number', 'PAN'];

class ParToHide {
	public async blur(payload) {
		obfuscateParams.forEach((val) => {
			this.hasValue(payload, val);
		});
		console.log(payload);
		return payload;
	}

	private async hasValue(object, property) {
		this.obfuscate(object, property);

		Object.keys(object).forEach((e) => {
			if (object[e] && Array.isArray(object[e])) {
				return object[e].forEach((item) => {
					this.hasValue(item, property);
				});
			}
			if (object[e] && typeof object[e] === 'object') {
				return this.hasValue(object[e], property);
			}
		});
	}

	private async obfuscate(item, key) {
		if (R.hasPath([key], item)) {
			item[key] = '*******';
		}
	}
}

try {
	const payload = [
		{
			cliente: {
				name: 'Super Mario',
				sobrenome: 'Bros',
				subnivel: {
					titulo: 'Teste',
					terceiroNivel: {
						card_number: '123456',
						PAN: '1231321',
					},
				},
			},
			description: 'blabla',
			PAN: '123456',
			listaPessoas: [
				{
					name: 'Super Luigi',
					sobrenome: 'Bros',
					subnivel: {
						titulo: 'Teste',
						terceiroNivel: {
							card_number: '123456',
							PAN: '1231321',
						},
					},
				},
				{
					name: 'Super Cogumelo',
					sobrenome: 'Bros',
					subnivel: {
						titulo: 'Teste',
						terceiroNivel: {
							card_number: '123456',
							PAN: '1231321',
						},
					},
				},
			],
		},
		{
			cliente: {
				name: 'Super Mario',
				sobrenome: 'Bros',
				subnivel: {
					titulo: 'Teste',
					terceiroNivel: {
						card_number: '123456',
						PAN: '1231321',
					},
				},
			},
			description: 'blabla',
			PAN: '123456',
			listaPessoas: [
				{
					name: 'Super Luigi',
					sobrenome: 'Bros',
					subnivel: {
						titulo: 'Teste',
						terceiroNivel: {
							card_number: '123456',
							PAN: '1231321',
						},
					},
				},
				{
					name: 'Super Cogumelo',
					sobrenome: 'Bros',
					subnivel: {
						titulo: 'Teste',
						terceiroNivel: {
							card_number: '123456',
							PAN: '1231321',
						},
					},
				},
			],
		},
	];

	new ParToHide().blur(payload);
} catch (error) {
	console.log(error);
}

export default new ParToHide();
