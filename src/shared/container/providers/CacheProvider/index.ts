import { container } from 'tsyringe'

import ICacheProvider	 from './models/ICacheProvider';
import RedisCacheProvider from '../CacheProvider/implementations/RedisCacheProvider';

const providers =  {
    redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
    'CacheProvider',
    providers.redis,
);

