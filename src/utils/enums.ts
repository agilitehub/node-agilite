export interface AxiosConfig {
  url: string
  method: string
  headers: any,
  data?: any,
  responseType?: string
}

interface Enums {
  URL_API_SERVER: string,
  STRING_EMPTY: string,
  STRING_DATA: string,
  HEADER_ISO_LANGUAGE: string,
  HEADER_START_DATE: string,
  HEADER_END_DATE: string,
  HEADER_INCLUDE_MODULES: string,
  HEADER_API_KEY: string,
  HEADER_TEAM_NAME: string,
  HEADER_CONTENT_TYPE: string,
  HEADER_PERSIST_FILE: string,
  HEADER_IS_PUBLIC: string,
  HEADER_PROFILE_KEY: string,
  HEADER_PROFILE_KEYS: string,
  HEADER_ROUTE_KEY: string,
  HEADER_PROCESS_KEY: string,
  HEADER_PROCESS_KEYS: string,
  HEADER_BPM_RECORD_ID: string,
  HEADER_BPM_RECORD_IDS: string,
  HEADER_STEP_NAMES: string,
  HEADER_RECORD_ID: string,
  HEADER_RECORD_IDS: string,
  HEADER_ROLE_NAME: string,
  HEADER_ROLE_NAMES: string,
  HEADER_CONDITIONAL_LEVELS: string,
  HEADER_SLIM_RESULT: string,
  HEADER_PUBLISH: string,
  HEADER_RESET_SERVICE: string,
  HEADER_CURRENT_USER: string,
  HEADER_CURRENT_STEP: string,
  HEADER_OPTION_SELECTED: string,
  HEADER_COMMENTS: string,
  HEADER_DATE_TIME_VALUE: string,
  HEADER_FORMAT_KEY: string,
  HEADER_RESPONSIBLE_USER: string,
  HEADER_CURRENT_RESPONSIBLE_USER: string,
  HEADER_NEW_RESPONSIBLE_USER: string,
  HEADER_RESPONSIBLE_USERS: string,
  HEADER_RELEVANT_USERS: string,
  HEADER_INCLUDE_HISTORY: string,
  HEADER_INCLUDE_STEP_OPTIONS: string,
  HEADER_INCLUDE_VISIBLE_OBJECTS: string,
  HEADER_INCLUDE_KEYWORDS: string,
  HEADER_PAGE: string,
  HEADER_PAGE_LIMIT: string,
  HEADER_APPLICATION_JSON: string,
  HEADER_OCTET_STREAM: string,
  HEADER_TEXT_PLAIN: string,
  HEADER_SORT: string,
  HEADER_SORT_BY: string,
  HEADER_OUTPUT_FORMAT: string,
  HEADER_GROUP_NAME: string,
  HEADER_VALUE_KEY: string,
  HEADER_LABEL_KEY: string,
  HEADER_VALUE: string,
  HEADER_LABEL: string,
  HEADER_FILE_ID: string,
  HEADER_FILE_NAME: string,
  HEADER_FULL_NAME: string,
  HEADER_TIER_KEYS: string,
  HEADER_INCLUDE_VALUES: string,
  HEADER_INCLUDE_META_DATA: string,
  HEADER_INCLUDE_TIER_ENTRIES: string,
  HEADER_RELEVANT_ROLES: string,
  HEADER_EVENT_STAMPS: string,
  HEADER_EVENT_START_DATE: string,
  HEADER_EVENT_END_DATE: string,
  HEADER_SORT_VALUES: string,
  HEADER_VALUES_OUTPUT_FORMAT: string,
  HEADER_LOG_PROCESS_ID: string,
  HEADER_FIELDS_TO_RETURN: string,
  HEADER_QRY_OPTIONS: string,
  HEADER_INCLUDE_DATA: string,
  HEADER_INCLUDE_CREDENTIALS: string,
  METHOD_DELETE: string,
  METHOD_GET: string,
  METHOD_POST: string,
  METHOD_PUT: string,
  MODULE_KEY_API_KEYS: string,
  MODULE_KEY_KEYWORDS: string,
  MODULE_KEY_NUMBERING: string,
  MODULE_KEY_CONNECTORS: string,
  MODULE_KEY_DATA_MAPPING: string,
  MODULE_KEY_TEMPLATES: string,
  MODULE_KEY_BPM: string,
  MODULE_KEY_ROLES: string,
  MODULE_KEY_BOT_BUILDER: string,
  MODULE_KEY_TIER_STRUCTURES: string,
  MODULE_KEY_BATCH_ACTIONS: string,
  MODULE_KEY_BATCH_LOGGING: string,
  MODULE_KEY_EVENTS: string,
  MODULE_KEY_FILES: string,
  MODULE_KEY_UTILS: string,
  MODULE_KEY_REPORTS: string,
  MODULE_KEY_ADMIN: string,
  MODULE_KEY_NODE_RED: string,
  MODULE_KEY_ADMIN_SOLUTIONS: string,
  VALUE_ARRAY_PROPER: string,
  VALUE_ARRAY_LOWER: string,
  VALUE_OBJECT_PROPER: string,
  VALUE_STRING_LOWER: string,
  VALUE_NUMBER_LOWER: string,
  VALUE_BOOLEAN_LOWER: string,
  VALUE_JSON_LOWER: string,
  SEPARATOR_COMMA: string
}

const Enums: Enums = {
  URL_API_SERVER: 'https://api.agilite.io',
  STRING_EMPTY: '',
  STRING_DATA: 'data',
  HEADER_ISO_LANGUAGE: 'iso-language',
  HEADER_START_DATE: 'start-date',
  HEADER_END_DATE: 'end-date',
  HEADER_INCLUDE_MODULES: 'include-modules',
  HEADER_API_KEY: 'api-key',
  HEADER_TEAM_NAME: 'team-name',
  HEADER_CONTENT_TYPE: 'Content-Type',
  HEADER_PERSIST_FILE: 'persist-file',
  HEADER_IS_PUBLIC: 'is-public',
  HEADER_PROFILE_KEY: 'profile-key',
  HEADER_PROFILE_KEYS: 'profile-keys',
  HEADER_ROUTE_KEY: 'route-key',
  HEADER_PROCESS_KEY: 'process-key',
  HEADER_PROCESS_KEYS: 'process-keys',
  HEADER_BPM_RECORD_ID: 'bpm-record-id',
  HEADER_BPM_RECORD_IDS: 'bpm-record-ids',
  HEADER_STEP_NAMES: 'step-names',
  HEADER_RECORD_ID: 'record-id',
  HEADER_RECORD_IDS: 'record-ids',
  HEADER_ROLE_NAME: 'role-name',
  HEADER_ROLE_NAMES: 'role-names',
  HEADER_CONDITIONAL_LEVELS: 'conditional-levels',
  HEADER_SLIM_RESULT: 'slim-result',
  HEADER_PUBLISH: 'publish',
  HEADER_RESET_SERVICE: 'reset-service',
  HEADER_CURRENT_USER: 'current-user',
  HEADER_CURRENT_STEP: 'current-step',
  HEADER_OPTION_SELECTED: 'option-selected',
  HEADER_COMMENTS: 'comments',
  HEADER_DATE_TIME_VALUE: 'date-time-value',
  HEADER_FORMAT_KEY: 'format-key',
  HEADER_RESPONSIBLE_USER: 'responsible-user',
  HEADER_CURRENT_RESPONSIBLE_USER: 'current-responsible-user',
  HEADER_NEW_RESPONSIBLE_USER: 'new-responsible-user',
  HEADER_RESPONSIBLE_USERS: 'responsible-users',
  HEADER_RELEVANT_USERS: 'relevant-users',
  HEADER_INCLUDE_HISTORY: 'include-history',
  HEADER_INCLUDE_STEP_OPTIONS: 'include-step-options',
  HEADER_INCLUDE_VISIBLE_OBJECTS: 'include-visible-objects',
  HEADER_INCLUDE_KEYWORDS: 'include-keywords',
  HEADER_PAGE: 'page',
  HEADER_PAGE_LIMIT: 'page-limit',
  HEADER_APPLICATION_JSON: 'application/json',
  HEADER_OCTET_STREAM: 'application/octet-stream',
  HEADER_TEXT_PLAIN: 'text/plain',
  HEADER_SORT: 'sort',
  HEADER_SORT_BY: 'sort-by',
  HEADER_OUTPUT_FORMAT: 'output-format',
  HEADER_GROUP_NAME: 'group-name',
  HEADER_VALUE_KEY: 'value-key',
  HEADER_LABEL_KEY: 'label-key',
  HEADER_VALUE: 'value',
  HEADER_LABEL: 'label',
  HEADER_FILE_ID: 'file-id',
  HEADER_FILE_NAME: 'file-name',
  HEADER_FULL_NAME: 'full-name',
  HEADER_TIER_KEYS: 'tier-keys',
  HEADER_INCLUDE_VALUES: 'include-values',
  HEADER_INCLUDE_META_DATA: 'include-meta-data',
  HEADER_INCLUDE_TIER_ENTRIES: 'include-tier-entries',
  HEADER_RELEVANT_ROLES: 'relevant-roles',
  HEADER_EVENT_STAMPS: 'event-stamps',
  HEADER_EVENT_START_DATE: 'event-start-date',
  HEADER_EVENT_END_DATE: 'event-end-date',
  HEADER_SORT_VALUES: 'sort-values',
  HEADER_VALUES_OUTPUT_FORMAT: 'values-output-format',
  HEADER_LOG_PROCESS_ID: 'log-process-id',
  HEADER_FIELDS_TO_RETURN: 'fields-to-return',
  HEADER_QRY_OPTIONS: 'qry-options',
  HEADER_INCLUDE_DATA: 'include-data',
  HEADER_INCLUDE_CREDENTIALS: 'include-credentials',
  METHOD_DELETE: 'delete',
  METHOD_GET: 'get',
  METHOD_POST: 'post',
  METHOD_PUT: 'put',
  MODULE_KEY_API_KEYS: 'apikeys',
  MODULE_KEY_KEYWORDS: 'keywords',
  MODULE_KEY_NUMBERING: 'numbering',
  MODULE_KEY_CONNECTORS: 'connectors',
  MODULE_KEY_DATA_MAPPING: 'datamappings',
  MODULE_KEY_TEMPLATES: 'templates',
  MODULE_KEY_BPM: 'bpm',
  MODULE_KEY_ROLES: 'roles',
  MODULE_KEY_BOT_BUILDER: 'botbuilder',
  MODULE_KEY_TIER_STRUCTURES: 'tierstructures',
  MODULE_KEY_BATCH_ACTIONS: 'batchactions',
  MODULE_KEY_BATCH_LOGGING: 'batchlogging',
  MODULE_KEY_EVENTS: 'events',
  MODULE_KEY_FILES: 'files',
  MODULE_KEY_UTILS: 'utils',
  MODULE_KEY_REPORTS: 'reports',
  MODULE_KEY_ADMIN: 'admin',
  MODULE_KEY_NODE_RED: 'nodered',
  MODULE_KEY_ADMIN_SOLUTIONS: 'solutions',
  VALUE_ARRAY_PROPER: 'Array',
  VALUE_ARRAY_LOWER: 'array',
  VALUE_OBJECT_PROPER: 'Object',
  VALUE_STRING_LOWER: 'string',
  VALUE_NUMBER_LOWER: 'number',
  VALUE_BOOLEAN_LOWER: 'boolean',
  VALUE_JSON_LOWER: 'json',
  SEPARATOR_COMMA: ','
}

export default Enums