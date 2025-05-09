import type { KintoneEventType, CommonEvent, KintoneEventMap } from './event';
import type {
  Calc as CalcField,
  Category as CategoryField,
  CheckBox as CheckBoxField,
  CreatedTime as CreatedTimeField,
  Creator as CreatorField,
  Date as DateField,
  DateTime as DateTimeField,
  Dropdown as DropdownField,
  File as FileField,
  GroupSelect as GroupSelectField,
  ID as IDField,
  InSubtable as InSubtableField,
  Link as LinkField,
  Modifier as ModifierField,
  MultiLineText as MultiLineTextField,
  MultiSelect as MultiSelectField,
  Number as NumberField,
  OneOf as OneOfField,
  OrganizationSelect as OrganizationSelectField,
  RadioButton as RadioButtonField,
  RecordNumber as RecordNumberField,
  Revision as RevisionField,
  RichText as RichTextField,
  SingleLineText as SingleLineTextField,
  StatusAssignee as StatusAssigneeField,
  Status as StatusField,
  Subtable as SubtableField,
  Time as TimeField,
  UpdatedTime as UpdatedTimeField,
  UserSelect as UserSelectField,
} from './field';
import type {
  CheckBox as DefaultLayoutCheckBox,
  CreatedTime as DefaultLayoutCreatedTime,
  Creator as DefaultLayoutCreator,
  Date as DefaultLayoutDate,
  DateTime as DefaultLayoutDateTime,
  Dropdown as DefaultLayoutDropdown,
  OneOf as DefaultLayoutField,
  File as DefaultLayoutFile,
  GroupSelect as DefaultLayoutGroupSelect,
  HR as DefaultLayoutHR,
  InSubtable as DefaultLayoutInSubtable,
  Label as DefaultLayoutLabel,
  Link as DefaultLayoutLink,
  Modifier as DefaultLayoutModifier,
  MultiLineText as DefaultLayoutMultiLineText,
  MultiSelect as DefaultLayoutMultiSelect,
  Number as DefaultLayoutNumber,
  OrganizationSelect as DefaultLayoutOrganizationSelect,
  RadioButton as DefaultLayoutRadioButton,
  RecordNumber as DefaultLayoutRecordNumber,
  ReferenceTable as DefaultLayoutReferenceTable,
  RichText as DefaultLayoutRichText,
  SingleLineText as DefaultLayoutSingleLineText,
  Spacer as DefaultLayoutSpacer,
  Time as DefaultLayoutTime,
  UpdatedTime as DefaultLayoutUpdatedTime,
  UserSelect as DefaultLayoutUserSelect,
} from './fieldLayout';
import type { Layout as DefaultLayout } from './form';
import type { Group as DefaultGroup, Row as DefaultRow } from './layout';
import type {
  Calc as CalcProperty,
  Category as CategoryProperty,
  CheckBox as CheckBoxProperty,
  CreatedTime as CreatedTimeProperty,
  Creator as CreatorProperty,
  Date as DateProperty,
  DateTime as DateTimeProperty,
  Dropdown as DropdownProperty,
  File as FileProperty,
  GroupSelect as GroupSelectProperty,
  InSubtable as InSubtableProperty,
  Link as LinkProperty,
  Modifier as ModifierProperty,
  MultiLineText as MultiLineTextProperty,
  MultiSelect as MultiSelectProperty,
  Number as NumberProperty,
  OneOf as OneOfProperty,
  Lookup as LookupProperty,
  OrganizationSelect as OrganizationSelectProperty,
  RadioButton as RadioButtonProperty,
  RecordNumber as RecordNumberProperty,
  RichText as RichTextProperty,
  SingleLineText as SingleLineTextProperty,
  StatusAssignee as StatusAssigneeProperty,
  Status as StatusProperty,
  Subtable as SubtableProperty,
  Time as TimeProperty,
  UpdatedTime as UpdatedTimeProperty,
  UserSelect as UserSelectProperty,
} from './property';
import type { Record as DefaultRecord } from './record';
import type { ViewForParameter, ViewForResponse } from './view';

export declare namespace kintoneAPI {
  type App = {
    appId: string;
    code: string;
    name: string;
    description: string;
    spaceId: string | null;
    threadId: string | null;
    createdAt: string;
    creator: { code: string; name: string };
    modifiedAt: string;
    modifier: {
      code: string;
      name: string;
    };
  };

  type RecordData = DefaultRecord;

  type EntityType = 'USER' | 'GROUP' | 'ORGANIZATION';
  type IDToRequest = string | number;

  export type ViewResponse = ViewForResponse;
  export type ViewParameter = ViewForParameter;

  type Field = OneOfField;

  /** JavaScript APIやREST APIから取得できるレコードの各フィールド情報 */
  namespace field {
    type Calc = CalcField;
    type Category = CategoryField;
    type CheckBox = CheckBoxField;
    type CreatedTime = CreatedTimeField;
    type Creator = CreatorField;
    type Date = DateField;
    type DateTime = DateTimeField;
    type Dropdown = DropdownField;
    type File = FileField;
    type GroupSelect = GroupSelectField;
    type GroupEntity = GroupSelect['value'][number];
    type ID = IDField;
    type InSubtable = InSubtableField;
    type Link = LinkField;
    type Modifier = ModifierField;
    type MultiLineText = MultiLineTextField;
    type MultiSelect = MultiSelectField;
    type Number = NumberField;
    type OneOf = OneOfField;
    type OrganizationSelect = OrganizationSelectField;
    type OrganizationEntity = OrganizationSelect['value'][number];
    type RadioButton = RadioButtonField;
    type RecordNumber = RecordNumberField;
    type Revision = RevisionField;
    type RichText = RichTextField;
    type SingleLineText = SingleLineTextField;
    type Status = StatusField;
    type StatusAssignee = StatusAssigneeField;
    type Subtable<T extends Record<string, InSubtable> = Record<string, InSubtable>> = SubtableField<T>;
    type Time = TimeField;
    type UpdatedTime = UpdatedTimeField;
    type UserSelect = UserSelectField;
    type UserEntity = UserSelect['value'][number];
  }

  type FieldProperty = OneOfProperty;
  type FieldPropertyType = FieldProperty['type'];
  type FieldProperties = Record<string, OneOfProperty>;
  type FieldEntry = [string, OneOfProperty];

  /** REST APIから取得できるアプリの各フィールド情報 */
  namespace property {
    type Calc = CalcProperty;
    type Category = CategoryProperty;
    type CheckBox = CheckBoxProperty;
    type CreatedTime = CreatedTimeProperty;
    type Creator = CreatorProperty;
    type Date = DateProperty;
    type DateTime = DateTimeProperty;
    type Dropdown = DropdownProperty;
    type File = FileProperty;
    type GroupSelect = GroupSelectProperty;
    type InSubtable = InSubtableProperty;
    type Link = LinkProperty;
    type Lookup = LookupProperty;
    type Modifier = ModifierProperty;
    type MultiLineText = MultiLineTextProperty;
    type MultiSelect = MultiSelectProperty;
    type Number = NumberProperty;
    type OneOf = OneOfProperty;
    type OrganizationSelect = OrganizationSelectProperty;
    type RadioButton = RadioButtonProperty;
    type RecordNumber = RecordNumberProperty;
    type RichText = RichTextProperty;
    type SingleLineText = SingleLineTextProperty;
    type Status = StatusProperty;
    type StatusAssignee = StatusAssigneeProperty;
    type Subtable<T extends Record<string, InSubtable> = Record<string, InSubtable>> = SubtableProperty<T>;
    type Time = TimeProperty;
    type UpdatedTime = UpdatedTimeProperty;
    type UserSelect = UserSelectProperty;
  }

  type Layout = DefaultLayout;
  type LayoutField = DefaultLayoutField;

  namespace layout {
    type Label = DefaultLayoutLabel;
    type Row = DefaultRow<LayoutField[]>;
    type Group = DefaultGroup<Row[]>;
    type Spacer = DefaultLayoutSpacer;
    type HR = DefaultLayoutHR;
    type CheckBox = DefaultLayoutCheckBox;
    type CreatedTime = DefaultLayoutCreatedTime;
    type Creator = DefaultLayoutCreator;
    type Date = DefaultLayoutDate;
    type DateTime = DefaultLayoutDateTime;
    type Dropdown = DefaultLayoutDropdown;
    type File = DefaultLayoutFile;
    type GroupSelect = DefaultLayoutGroupSelect;
    type InSubtable = DefaultLayoutInSubtable;
    type Link = DefaultLayoutLink;
    type Modifier = DefaultLayoutModifier;
    type MultiLineText = DefaultLayoutMultiLineText;
    type MultiSelect = DefaultLayoutMultiSelect;
    type Number = DefaultLayoutNumber;
    type OrganizationSelect = DefaultLayoutOrganizationSelect;
    type RadioButton = DefaultLayoutRadioButton;
    type RecordNumber = DefaultLayoutRecordNumber;
    type ReferenceTable = DefaultLayoutReferenceTable;
    type RichText = DefaultLayoutRichText;
    type SingleLineText = DefaultLayoutSingleLineText;
    type Time = DefaultLayoutTime;
    type UpdatedTime = DefaultLayoutUpdatedTime;
    type UserSelect = DefaultLayoutUserSelect;
  }

  type AppSettings = {
    name: string;
    description: string;
    icon:
      | {
          type: 'FILE';
          file: {
            contentType: string;
            fileKey: string;
            name: string;
            size: string;
          };
        }
      | {
          type: 'PRESET';
          key: string;
        };
    theme: 'WHITE' | 'CLIPBOARD' | 'BINDER' | 'PENCIL' | 'CLIPS' | 'RED' | 'BLUE' | 'GREEN' | 'YELLOW' | 'BLACK';
    revision: string;
  };

  namespace response {
    type App = { readonly app?: kintoneAPI.App; readonly fields?: FieldProperties };
  }

  namespace event {
    type EventType = KintoneEventType;
    type BaseEvent<T = RecordData> = CommonEvent<T>;
    type EventTypeMap<T extends KintoneEventType> = KintoneEventMap<T>;
  }

  namespace rest {
    type AppIDToRequest = string | number;
    type RecordID = string | number;
    type Revision = string | number;
    type IDToRequest = string | number;
    type Frame = Record<string, any>;
    type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';
    type Lang = 'ja' | 'en' | 'zh' | 'user' | 'default';
    type People = {
      code: string;
      name: string;
    };
    type WithCommonRequestParams<T> = T & {
      debug?: boolean;
      guestSpaceId?: string | number;
    };

    type TypeOmmited<T extends Record<string, any>> = {
      [P in keyof T]: Omit<T[P], 'type'>;
    };

    type RecordToRequest<T extends Frame = kintoneAPI.RecordData> = Partial<TypeOmmited<T>>;

    type RecordGetResponse<T extends Frame = kintoneAPI.RecordData> = {
      record: T;
    };

    type RecordPostResponse = {
      id: string;
      revision: string;
    };

    type RecordPutResponse = {
      revision: string;
    };

    type RecordsGetResponse<T extends Frame = kintoneAPI.RecordData> = {
      records: T[];
      totalCount?: string | null;
    };

    type RecordsPostResponse = {
      ids: string[];
      revisions: string[];
    };

    type RecordsPutResponse = {
      records: {
        id: string;
        revision: string;
      }[];
    };

    type RecordsDeleteResponse = {};

    type CursorCreateRequest = WithCommonRequestParams<{
      app: AppIDToRequest;
      fields?: string[];
      query?: string;
      size?: number | string;
    }>;
    type CursorCreateResponse = {
      id: string;
      totalCount: string;
    };
    type CursorGetRequest = WithCommonRequestParams<{
      id: string;
    }>;
    type CursorGetResponse<T extends Frame = kintoneAPI.RecordData> = {
      records: T[];
      next: boolean;
    };

    type CommentsGetRequest = WithCommonRequestParams<{
      app: AppIDToRequest;
      record: RecordID;
      order?: 'asc' | 'desc';
      offset?: number;
      limit?: number;
    }>;
    type CommentsGetResponse = {
      comments: {
        id: string;
        text: string;
        createdAt: string;
        creator: People;
        mentions: People[];
      }[];
      older: boolean;
      newer: boolean;
    };
    type CommentPostRequest = WithCommonRequestParams<{
      app: AppIDToRequest;
      record: RecordID;
      comment: {
        text: string;
        mentions?: { code: string; type?: EntityType }[];
      };
    }>;
    type CommentPostResponse = {
      id: number;
    };
    type CommentDeleteRequest = WithCommonRequestParams<{
      app: AppIDToRequest;
      record: RecordID;
      comment: string | number;
    }>;
    type CommentDeleteResponse = {};

    type RecordAssigneesPutResponse = {
      revision: string;
    };

    type ACLRight = {
      id: string;
      record: {
        viewable: boolean;
        editable: boolean;
        deletable: boolean;
      };
      fields: Record<
        string,
        {
          viewable: boolean;
          editable: boolean;
        }
      >;
    };

    type RecordACLEvaluateGetResponse = {
      rights: ACLRight[];
    };

    type RecordStatusPutResponse = {
      revision: string;
    };

    type RecordStatusesPutResponse = {
      records: {
        id: string;
        revision: string;
      }[];
    };

    namespace bulkRequest {}

    type BulkResponse = {
      results: (
        | RecordsPutResponse
        | RecordPostResponse
        | RecordsPostResponse
        | RecordsPutResponse
        | RecordsDeleteResponse
        | RecordAssigneesPutResponse
        | RecordStatusPutResponse
        | RecordStatusesPutResponse
      )[];
    };

    type ChartType = 'BAR' | 'COLUMN' | 'PIE' | 'LINE' | 'PIVOT_TABLE' | 'TABLE' | 'AREA' | 'SPLINE' | 'SPLINE_AREA';
    type ChartMode = 'NORMAL' | 'STACKED' | 'PERCENTAGE';
    type ChartPeriod = 'YEAR' | 'QUARTER' | 'MONTH' | 'WEEK' | 'DAY' | 'HOUR' | 'MINUTE';
    type ChartAggregationType = 'COUNT' | 'SUM' | 'AVERAGE' | 'MAX' | 'MIN';

    type AppReportsGetResponse = {
      reports: Record<
        string,
        {
          chartType: ChartType;
          chartMode: ChartMode;
          id: string;
          name: string;
          index: string;
          groups: {
            code: string;
            per: ChartPeriod;
          }[];
          aggregations: {
            type: ChartAggregationType;
            code: string;
          }[];
          filterCond: string;
          sorts: {
            by: 'TOTAL' | 'GROUP1' | 'GROUP2' | 'GROUP3';
            order: 'ASC' | 'DESC';
          }[];
          periodicReport: {
            active: boolean;
            period: {
              every: ChartPeriod;
              month: string;
              time: string;
              pattern: 'JAN_APR_JUL_OCT' | 'FEB_MAY_AUG_NOV' | 'MAR_JUN_SEP_DEC';
              dayOfMonth: string;
              dayOfWeek: 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
              minute: '0' | '10' | '20' | '30' | '40' | '50';
            };
          } | null;
          revision: string;
        }
      >;
    };

    namespace space {
      type SpaceIdToRequest = string | number;
      type GetSpaceRequest = { id: string | number };
      type GetSpaceResponse = {
        id: string; // スペースID
        name: string; // スペース名
        /**
         * スペースが作成されたときに初期作成されたスレッドのスレッド ID
         * 1 つのスレッドのみ使用するスペースの場合はこのスレッドのみ存在します。
         */
        defaultThread: string;
        isPrivate: boolean; // 公開／非公開の区分
        creator: People;
        modifier: People;
        memberCount: string;
        coverType: string;
        coverKey: string; // スペースのカバー画像のキー文字列
        coverUrl: string; // スペースのカバー画像の URL
        body: string;
        useMultiThread: boolean;
        isGuest: boolean;
        attachedApps: {
          threadId: string;
          appId: string;
          code: string;
          name: string;
          description: string;
          createdAt: string;
          creator: People;
          modifiedAt: string;
          modifier: People;
          fixedMember: boolean;
          showAnnouncement: boolean;
          showThreadList: boolean;
          showAppList: boolean;
          showMemberList: boolean;
          showRelatedLinkList: boolean;
        }[];
      };

      type GetSpaceMembersRequest = {
        id: IDToRequest;
      };
    }
  }

  namespace cybozu {
    type CustomItemValue = {
      code: string;
      value: string;
    };

    type CybozuUser = {
      id: number;
      code: string;
      ctime: string;
      mtime: string;
      valid: boolean;
      name: string;
      surName: string;
      givenName: string;
      surNameReading: string;
      givenNameReading: string;
      localName: string;
      localNameLocale: string;
      timezone: string;
      locale: string;
      description: string;
      phone: string;
      mobilePhone: string;
      extensionNumber: string;
      email: string;
      callto: string;
      url: string;
      employeeNumber: string;
      birthDate: string;
      joinDate: string;
      primaryOrganization: number;
      sortOrder: number;
      customItemValues: CustomItemValue[];
    };

    type GetUsersRequest = {
      ids?: string[];
      codes?: string[];
      size?: number;
      offset?: number;
    };
    type GetUsersResponse = {
      users: CybozuUser[];
    };

    type GetUsedServicesRequest = {
      code: string[];
      size?: number;
      offset?: number;
    };
    type GetUsedServicesResponse = {
      users: {
        code: string;
        services: string[];
      };
    };

    type UpdateUsedServicesRequest = {
      users: {
        code: string;
        services: string[];
      };
    };
    type UpdateUsedServicesResponse = {};
  }
}
