import { container } from 'tsyringe'

import mailConfig from '@config/mail';
import EtherealMail from '../MailProvider/Implementations/EtherealMailProvider';
import SESMail from '../MailProvider/Implementations/SESMailProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from './implementations/HandleBarsMailTemplateProvider';


const providers =  {
    handlebars: HandleBarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    providers.handlebars,
);

export default providers;
