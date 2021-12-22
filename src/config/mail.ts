interface IMailConfig {
    driver: 'ethereal' | 'ses';

    defaults: {
        from: {
            email: string;
            name: string;
        }
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'viniciusgsf#gmail.com',
            name: 'Vinicius Ferreira'
        },
    },

} as IMailConfig;
