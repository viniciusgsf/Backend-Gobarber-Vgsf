import { container } from 'tsyringe'

import mailConfig from '@config/mail';
import EtherealMail from './Implementations/EtherealMailProvider';
import SESMail from './Implementations/SESMailProvider';
import IMailProvider from './Models/IMailProvider';


const providers =  {
    ethereal: container.resolve(EtherealMail),
    ses: container.resolve(SESMail),
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    providers[mailConfig.driver],
);

export default providers;
