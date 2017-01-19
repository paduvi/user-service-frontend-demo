/**
 * Created by chotoxautinh on 1/11/17.
 */
import {schema} from 'normalizr';

export const auth = new schema.Entity('auth', {}, {idAttribute: 'accessToken'});