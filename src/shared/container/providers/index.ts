import { container } from "tsyringe";

import IStorageProvider from "./storageProvider/models/IStorageProvider";
import DiskStorageProvider from "./storageProvider/implementations/DiskStorageProvider";

import IMailProvider from '../providers/MailProvider/Models/IMailProvider';
import EtherealMailProvider from '../providers/MailProvider/Implementations/EtherealMailProvider';

import IMailTemplateProvider from '../providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from '../providers/MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandleBarsMailTemplateProvider,
);
container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);
