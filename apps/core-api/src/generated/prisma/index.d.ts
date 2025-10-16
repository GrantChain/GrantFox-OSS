
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MaintainerProfile
 * 
 */
export type MaintainerProfile = $Result.DefaultSelection<Prisma.$MaintainerProfilePayload>
/**
 * Model ContributorProfile
 * 
 */
export type ContributorProfile = $Result.DefaultSelection<Prisma.$ContributorProfilePayload>
/**
 * Model AdminProfile
 * 
 */
export type AdminProfile = $Result.DefaultSelection<Prisma.$AdminProfilePayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Repository
 * 
 */
export type Repository = $Result.DefaultSelection<Prisma.$RepositoryPayload>
/**
 * Model ProjectMaintainer
 * 
 */
export type ProjectMaintainer = $Result.DefaultSelection<Prisma.$ProjectMaintainerPayload>
/**
 * Model ProjectReview
 * 
 */
export type ProjectReview = $Result.DefaultSelection<Prisma.$ProjectReviewPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  MAINTAINER: 'MAINTAINER',
  CONTRIBUTOR: 'CONTRIBUTOR'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ProjectStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const ProjectCategory: {
  DEFI: 'DEFI',
  NFT: 'NFT',
  TOOLING: 'TOOLING',
  PAYMENTS: 'PAYMENTS',
  GAMING: 'GAMING',
  INFRASTRUCTURE: 'INFRASTRUCTURE',
  OTHER: 'OTHER'
};

export type ProjectCategory = (typeof ProjectCategory)[keyof typeof ProjectCategory]


export const ReviewAction: {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ReviewAction = (typeof ReviewAction)[keyof typeof ReviewAction]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type ProjectCategory = $Enums.ProjectCategory

export const ProjectCategory: typeof $Enums.ProjectCategory

export type ReviewAction = $Enums.ReviewAction

export const ReviewAction: typeof $Enums.ReviewAction

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.maintainerProfile`: Exposes CRUD operations for the **MaintainerProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaintainerProfiles
    * const maintainerProfiles = await prisma.maintainerProfile.findMany()
    * ```
    */
  get maintainerProfile(): Prisma.MaintainerProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contributorProfile`: Exposes CRUD operations for the **ContributorProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContributorProfiles
    * const contributorProfiles = await prisma.contributorProfile.findMany()
    * ```
    */
  get contributorProfile(): Prisma.ContributorProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminProfile`: Exposes CRUD operations for the **AdminProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminProfiles
    * const adminProfiles = await prisma.adminProfile.findMany()
    * ```
    */
  get adminProfile(): Prisma.AdminProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repository`: Exposes CRUD operations for the **Repository** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Repositories
    * const repositories = await prisma.repository.findMany()
    * ```
    */
  get repository(): Prisma.RepositoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectMaintainer`: Exposes CRUD operations for the **ProjectMaintainer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectMaintainers
    * const projectMaintainers = await prisma.projectMaintainer.findMany()
    * ```
    */
  get projectMaintainer(): Prisma.ProjectMaintainerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectReview`: Exposes CRUD operations for the **ProjectReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectReviews
    * const projectReviews = await prisma.projectReview.findMany()
    * ```
    */
  get projectReview(): Prisma.ProjectReviewDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    MaintainerProfile: 'MaintainerProfile',
    ContributorProfile: 'ContributorProfile',
    AdminProfile: 'AdminProfile',
    Wallet: 'Wallet',
    Project: 'Project',
    Repository: 'Repository',
    ProjectMaintainer: 'ProjectMaintainer',
    ProjectReview: 'ProjectReview'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "maintainerProfile" | "contributorProfile" | "adminProfile" | "wallet" | "project" | "repository" | "projectMaintainer" | "projectReview"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      MaintainerProfile: {
        payload: Prisma.$MaintainerProfilePayload<ExtArgs>
        fields: Prisma.MaintainerProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaintainerProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaintainerProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload>
          }
          findFirst: {
            args: Prisma.MaintainerProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaintainerProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload>
          }
          findMany: {
            args: Prisma.MaintainerProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload>[]
          }
          create: {
            args: Prisma.MaintainerProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload>
          }
          createMany: {
            args: Prisma.MaintainerProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaintainerProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload>[]
          }
          delete: {
            args: Prisma.MaintainerProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload>
          }
          update: {
            args: Prisma.MaintainerProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload>
          }
          deleteMany: {
            args: Prisma.MaintainerProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaintainerProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MaintainerProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload>[]
          }
          upsert: {
            args: Prisma.MaintainerProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintainerProfilePayload>
          }
          aggregate: {
            args: Prisma.MaintainerProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaintainerProfile>
          }
          groupBy: {
            args: Prisma.MaintainerProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaintainerProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaintainerProfileCountArgs<ExtArgs>
            result: $Utils.Optional<MaintainerProfileCountAggregateOutputType> | number
          }
        }
      }
      ContributorProfile: {
        payload: Prisma.$ContributorProfilePayload<ExtArgs>
        fields: Prisma.ContributorProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContributorProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContributorProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload>
          }
          findFirst: {
            args: Prisma.ContributorProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContributorProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload>
          }
          findMany: {
            args: Prisma.ContributorProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload>[]
          }
          create: {
            args: Prisma.ContributorProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload>
          }
          createMany: {
            args: Prisma.ContributorProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContributorProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload>[]
          }
          delete: {
            args: Prisma.ContributorProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload>
          }
          update: {
            args: Prisma.ContributorProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload>
          }
          deleteMany: {
            args: Prisma.ContributorProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContributorProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContributorProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload>[]
          }
          upsert: {
            args: Prisma.ContributorProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributorProfilePayload>
          }
          aggregate: {
            args: Prisma.ContributorProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContributorProfile>
          }
          groupBy: {
            args: Prisma.ContributorProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContributorProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContributorProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ContributorProfileCountAggregateOutputType> | number
          }
        }
      }
      AdminProfile: {
        payload: Prisma.$AdminProfilePayload<ExtArgs>
        fields: Prisma.AdminProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          findFirst: {
            args: Prisma.AdminProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          findMany: {
            args: Prisma.AdminProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>[]
          }
          create: {
            args: Prisma.AdminProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          createMany: {
            args: Prisma.AdminProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>[]
          }
          delete: {
            args: Prisma.AdminProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          update: {
            args: Prisma.AdminProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          deleteMany: {
            args: Prisma.AdminProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>[]
          }
          upsert: {
            args: Prisma.AdminProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminProfilePayload>
          }
          aggregate: {
            args: Prisma.AdminProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminProfile>
          }
          groupBy: {
            args: Prisma.AdminProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminProfileCountArgs<ExtArgs>
            result: $Utils.Optional<AdminProfileCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Repository: {
        payload: Prisma.$RepositoryPayload<ExtArgs>
        fields: Prisma.RepositoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepositoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepositoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          findFirst: {
            args: Prisma.RepositoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepositoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          findMany: {
            args: Prisma.RepositoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[]
          }
          create: {
            args: Prisma.RepositoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          createMany: {
            args: Prisma.RepositoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepositoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[]
          }
          delete: {
            args: Prisma.RepositoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          update: {
            args: Prisma.RepositoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          deleteMany: {
            args: Prisma.RepositoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepositoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepositoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[]
          }
          upsert: {
            args: Prisma.RepositoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          aggregate: {
            args: Prisma.RepositoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepository>
          }
          groupBy: {
            args: Prisma.RepositoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepositoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepositoryCountArgs<ExtArgs>
            result: $Utils.Optional<RepositoryCountAggregateOutputType> | number
          }
        }
      }
      ProjectMaintainer: {
        payload: Prisma.$ProjectMaintainerPayload<ExtArgs>
        fields: Prisma.ProjectMaintainerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectMaintainerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectMaintainerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload>
          }
          findFirst: {
            args: Prisma.ProjectMaintainerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectMaintainerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload>
          }
          findMany: {
            args: Prisma.ProjectMaintainerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload>[]
          }
          create: {
            args: Prisma.ProjectMaintainerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload>
          }
          createMany: {
            args: Prisma.ProjectMaintainerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectMaintainerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload>[]
          }
          delete: {
            args: Prisma.ProjectMaintainerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload>
          }
          update: {
            args: Prisma.ProjectMaintainerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload>
          }
          deleteMany: {
            args: Prisma.ProjectMaintainerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectMaintainerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectMaintainerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload>[]
          }
          upsert: {
            args: Prisma.ProjectMaintainerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMaintainerPayload>
          }
          aggregate: {
            args: Prisma.ProjectMaintainerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectMaintainer>
          }
          groupBy: {
            args: Prisma.ProjectMaintainerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectMaintainerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectMaintainerCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectMaintainerCountAggregateOutputType> | number
          }
        }
      }
      ProjectReview: {
        payload: Prisma.$ProjectReviewPayload<ExtArgs>
        fields: Prisma.ProjectReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload>
          }
          findFirst: {
            args: Prisma.ProjectReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload>
          }
          findMany: {
            args: Prisma.ProjectReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload>[]
          }
          create: {
            args: Prisma.ProjectReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload>
          }
          createMany: {
            args: Prisma.ProjectReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload>[]
          }
          delete: {
            args: Prisma.ProjectReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload>
          }
          update: {
            args: Prisma.ProjectReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload>
          }
          deleteMany: {
            args: Prisma.ProjectReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload>[]
          }
          upsert: {
            args: Prisma.ProjectReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectReviewPayload>
          }
          aggregate: {
            args: Prisma.ProjectReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectReview>
          }
          groupBy: {
            args: Prisma.ProjectReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectReviewCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    maintainerProfile?: MaintainerProfileOmit
    contributorProfile?: ContributorProfileOmit
    adminProfile?: AdminProfileOmit
    wallet?: WalletOmit
    project?: ProjectOmit
    repository?: RepositoryOmit
    projectMaintainer?: ProjectMaintainerOmit
    projectReview?: ProjectReviewOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    project_maintainers: number
    project_reviews: number
    wallets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project_maintainers?: boolean | UserCountOutputTypeCountProject_maintainersArgs
    project_reviews?: boolean | UserCountOutputTypeCountProject_reviewsArgs
    wallets?: boolean | UserCountOutputTypeCountWalletsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProject_maintainersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMaintainerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProject_reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    repositories: number
    maintainers: number
    reviews: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repositories?: boolean | ProjectCountOutputTypeCountRepositoriesArgs
    maintainers?: boolean | ProjectCountOutputTypeCountMaintainersArgs
    reviews?: boolean | ProjectCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountRepositoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepositoryWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountMaintainersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMaintainerWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectReviewWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    user_id: string | null
    email: string | null
    username: string | null
    avatar_url: string | null
    created_at: Date | null
    updated_at: Date | null
    is_active: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: string | null
    email: string | null
    username: string | null
    avatar_url: string | null
    created_at: Date | null
    updated_at: Date | null
    is_active: boolean | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    email: number
    username: number
    avatar_url: number
    roles: number
    created_at: number
    updated_at: number
    is_active: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    user_id?: true
    email?: true
    username?: true
    avatar_url?: true
    created_at?: true
    updated_at?: true
    is_active?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    email?: true
    username?: true
    avatar_url?: true
    created_at?: true
    updated_at?: true
    is_active?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    email?: true
    username?: true
    avatar_url?: true
    roles?: true
    created_at?: true
    updated_at?: true
    is_active?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: string
    email: string
    username: string | null
    avatar_url: string | null
    roles: $Enums.UserRole[]
    created_at: Date
    updated_at: Date
    is_active: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    username?: boolean
    avatar_url?: boolean
    roles?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
    maintainer_profile?: boolean | User$maintainer_profileArgs<ExtArgs>
    contributor_profile?: boolean | User$contributor_profileArgs<ExtArgs>
    admin_profile?: boolean | User$admin_profileArgs<ExtArgs>
    project_maintainers?: boolean | User$project_maintainersArgs<ExtArgs>
    project_reviews?: boolean | User$project_reviewsArgs<ExtArgs>
    wallets?: boolean | User$walletsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    username?: boolean
    avatar_url?: boolean
    roles?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    email?: boolean
    username?: boolean
    avatar_url?: boolean
    roles?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    user_id?: boolean
    email?: boolean
    username?: boolean
    avatar_url?: boolean
    roles?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "email" | "username" | "avatar_url" | "roles" | "created_at" | "updated_at" | "is_active", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    maintainer_profile?: boolean | User$maintainer_profileArgs<ExtArgs>
    contributor_profile?: boolean | User$contributor_profileArgs<ExtArgs>
    admin_profile?: boolean | User$admin_profileArgs<ExtArgs>
    project_maintainers?: boolean | User$project_maintainersArgs<ExtArgs>
    project_reviews?: boolean | User$project_reviewsArgs<ExtArgs>
    wallets?: boolean | User$walletsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      maintainer_profile: Prisma.$MaintainerProfilePayload<ExtArgs> | null
      contributor_profile: Prisma.$ContributorProfilePayload<ExtArgs> | null
      admin_profile: Prisma.$AdminProfilePayload<ExtArgs> | null
      project_maintainers: Prisma.$ProjectMaintainerPayload<ExtArgs>[]
      project_reviews: Prisma.$ProjectReviewPayload<ExtArgs>[]
      wallets: Prisma.$WalletPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      email: string
      username: string | null
      avatar_url: string | null
      roles: $Enums.UserRole[]
      created_at: Date
      updated_at: Date
      is_active: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    maintainer_profile<T extends User$maintainer_profileArgs<ExtArgs> = {}>(args?: Subset<T, User$maintainer_profileArgs<ExtArgs>>): Prisma__MaintainerProfileClient<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    contributor_profile<T extends User$contributor_profileArgs<ExtArgs> = {}>(args?: Subset<T, User$contributor_profileArgs<ExtArgs>>): Prisma__ContributorProfileClient<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    admin_profile<T extends User$admin_profileArgs<ExtArgs> = {}>(args?: Subset<T, User$admin_profileArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    project_maintainers<T extends User$project_maintainersArgs<ExtArgs> = {}>(args?: Subset<T, User$project_maintainersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    project_reviews<T extends User$project_reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$project_reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wallets<T extends User$walletsArgs<ExtArgs> = {}>(args?: Subset<T, User$walletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly user_id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly avatar_url: FieldRef<"User", 'String'>
    readonly roles: FieldRef<"User", 'UserRole[]'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly is_active: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.maintainer_profile
   */
  export type User$maintainer_profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    where?: MaintainerProfileWhereInput
  }

  /**
   * User.contributor_profile
   */
  export type User$contributor_profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    where?: ContributorProfileWhereInput
  }

  /**
   * User.admin_profile
   */
  export type User$admin_profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    where?: AdminProfileWhereInput
  }

  /**
   * User.project_maintainers
   */
  export type User$project_maintainersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    where?: ProjectMaintainerWhereInput
    orderBy?: ProjectMaintainerOrderByWithRelationInput | ProjectMaintainerOrderByWithRelationInput[]
    cursor?: ProjectMaintainerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMaintainerScalarFieldEnum | ProjectMaintainerScalarFieldEnum[]
  }

  /**
   * User.project_reviews
   */
  export type User$project_reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    where?: ProjectReviewWhereInput
    orderBy?: ProjectReviewOrderByWithRelationInput | ProjectReviewOrderByWithRelationInput[]
    cursor?: ProjectReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectReviewScalarFieldEnum | ProjectReviewScalarFieldEnum[]
  }

  /**
   * User.wallets
   */
  export type User$walletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    cursor?: WalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model MaintainerProfile
   */

  export type AggregateMaintainerProfile = {
    _count: MaintainerProfileCountAggregateOutputType | null
    _min: MaintainerProfileMinAggregateOutputType | null
    _max: MaintainerProfileMaxAggregateOutputType | null
  }

  export type MaintainerProfileMinAggregateOutputType = {
    user_id: string | null
    bio: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MaintainerProfileMaxAggregateOutputType = {
    user_id: string | null
    bio: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MaintainerProfileCountAggregateOutputType = {
    user_id: number
    bio: number
    social_media: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type MaintainerProfileMinAggregateInputType = {
    user_id?: true
    bio?: true
    created_at?: true
    updated_at?: true
  }

  export type MaintainerProfileMaxAggregateInputType = {
    user_id?: true
    bio?: true
    created_at?: true
    updated_at?: true
  }

  export type MaintainerProfileCountAggregateInputType = {
    user_id?: true
    bio?: true
    social_media?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type MaintainerProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaintainerProfile to aggregate.
     */
    where?: MaintainerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintainerProfiles to fetch.
     */
    orderBy?: MaintainerProfileOrderByWithRelationInput | MaintainerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaintainerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintainerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintainerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaintainerProfiles
    **/
    _count?: true | MaintainerProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaintainerProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaintainerProfileMaxAggregateInputType
  }

  export type GetMaintainerProfileAggregateType<T extends MaintainerProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateMaintainerProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaintainerProfile[P]>
      : GetScalarType<T[P], AggregateMaintainerProfile[P]>
  }




  export type MaintainerProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaintainerProfileWhereInput
    orderBy?: MaintainerProfileOrderByWithAggregationInput | MaintainerProfileOrderByWithAggregationInput[]
    by: MaintainerProfileScalarFieldEnum[] | MaintainerProfileScalarFieldEnum
    having?: MaintainerProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaintainerProfileCountAggregateInputType | true
    _min?: MaintainerProfileMinAggregateInputType
    _max?: MaintainerProfileMaxAggregateInputType
  }

  export type MaintainerProfileGroupByOutputType = {
    user_id: string
    bio: string | null
    social_media: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: MaintainerProfileCountAggregateOutputType | null
    _min: MaintainerProfileMinAggregateOutputType | null
    _max: MaintainerProfileMaxAggregateOutputType | null
  }

  type GetMaintainerProfileGroupByPayload<T extends MaintainerProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaintainerProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaintainerProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaintainerProfileGroupByOutputType[P]>
            : GetScalarType<T[P], MaintainerProfileGroupByOutputType[P]>
        }
      >
    >


  export type MaintainerProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    bio?: boolean
    social_media?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["maintainerProfile"]>

  export type MaintainerProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    bio?: boolean
    social_media?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["maintainerProfile"]>

  export type MaintainerProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    bio?: boolean
    social_media?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["maintainerProfile"]>

  export type MaintainerProfileSelectScalar = {
    user_id?: boolean
    bio?: boolean
    social_media?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type MaintainerProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "bio" | "social_media" | "created_at" | "updated_at", ExtArgs["result"]["maintainerProfile"]>
  export type MaintainerProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MaintainerProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MaintainerProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MaintainerProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaintainerProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      bio: string | null
      social_media: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["maintainerProfile"]>
    composites: {}
  }

  type MaintainerProfileGetPayload<S extends boolean | null | undefined | MaintainerProfileDefaultArgs> = $Result.GetResult<Prisma.$MaintainerProfilePayload, S>

  type MaintainerProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MaintainerProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MaintainerProfileCountAggregateInputType | true
    }

  export interface MaintainerProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaintainerProfile'], meta: { name: 'MaintainerProfile' } }
    /**
     * Find zero or one MaintainerProfile that matches the filter.
     * @param {MaintainerProfileFindUniqueArgs} args - Arguments to find a MaintainerProfile
     * @example
     * // Get one MaintainerProfile
     * const maintainerProfile = await prisma.maintainerProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaintainerProfileFindUniqueArgs>(args: SelectSubset<T, MaintainerProfileFindUniqueArgs<ExtArgs>>): Prisma__MaintainerProfileClient<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MaintainerProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaintainerProfileFindUniqueOrThrowArgs} args - Arguments to find a MaintainerProfile
     * @example
     * // Get one MaintainerProfile
     * const maintainerProfile = await prisma.maintainerProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaintainerProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, MaintainerProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaintainerProfileClient<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaintainerProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintainerProfileFindFirstArgs} args - Arguments to find a MaintainerProfile
     * @example
     * // Get one MaintainerProfile
     * const maintainerProfile = await prisma.maintainerProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaintainerProfileFindFirstArgs>(args?: SelectSubset<T, MaintainerProfileFindFirstArgs<ExtArgs>>): Prisma__MaintainerProfileClient<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MaintainerProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintainerProfileFindFirstOrThrowArgs} args - Arguments to find a MaintainerProfile
     * @example
     * // Get one MaintainerProfile
     * const maintainerProfile = await prisma.maintainerProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaintainerProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, MaintainerProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaintainerProfileClient<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MaintainerProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintainerProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaintainerProfiles
     * const maintainerProfiles = await prisma.maintainerProfile.findMany()
     * 
     * // Get first 10 MaintainerProfiles
     * const maintainerProfiles = await prisma.maintainerProfile.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const maintainerProfileWithUser_idOnly = await prisma.maintainerProfile.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends MaintainerProfileFindManyArgs>(args?: SelectSubset<T, MaintainerProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MaintainerProfile.
     * @param {MaintainerProfileCreateArgs} args - Arguments to create a MaintainerProfile.
     * @example
     * // Create one MaintainerProfile
     * const MaintainerProfile = await prisma.maintainerProfile.create({
     *   data: {
     *     // ... data to create a MaintainerProfile
     *   }
     * })
     * 
     */
    create<T extends MaintainerProfileCreateArgs>(args: SelectSubset<T, MaintainerProfileCreateArgs<ExtArgs>>): Prisma__MaintainerProfileClient<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MaintainerProfiles.
     * @param {MaintainerProfileCreateManyArgs} args - Arguments to create many MaintainerProfiles.
     * @example
     * // Create many MaintainerProfiles
     * const maintainerProfile = await prisma.maintainerProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaintainerProfileCreateManyArgs>(args?: SelectSubset<T, MaintainerProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaintainerProfiles and returns the data saved in the database.
     * @param {MaintainerProfileCreateManyAndReturnArgs} args - Arguments to create many MaintainerProfiles.
     * @example
     * // Create many MaintainerProfiles
     * const maintainerProfile = await prisma.maintainerProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaintainerProfiles and only return the `user_id`
     * const maintainerProfileWithUser_idOnly = await prisma.maintainerProfile.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaintainerProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, MaintainerProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MaintainerProfile.
     * @param {MaintainerProfileDeleteArgs} args - Arguments to delete one MaintainerProfile.
     * @example
     * // Delete one MaintainerProfile
     * const MaintainerProfile = await prisma.maintainerProfile.delete({
     *   where: {
     *     // ... filter to delete one MaintainerProfile
     *   }
     * })
     * 
     */
    delete<T extends MaintainerProfileDeleteArgs>(args: SelectSubset<T, MaintainerProfileDeleteArgs<ExtArgs>>): Prisma__MaintainerProfileClient<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MaintainerProfile.
     * @param {MaintainerProfileUpdateArgs} args - Arguments to update one MaintainerProfile.
     * @example
     * // Update one MaintainerProfile
     * const maintainerProfile = await prisma.maintainerProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaintainerProfileUpdateArgs>(args: SelectSubset<T, MaintainerProfileUpdateArgs<ExtArgs>>): Prisma__MaintainerProfileClient<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MaintainerProfiles.
     * @param {MaintainerProfileDeleteManyArgs} args - Arguments to filter MaintainerProfiles to delete.
     * @example
     * // Delete a few MaintainerProfiles
     * const { count } = await prisma.maintainerProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaintainerProfileDeleteManyArgs>(args?: SelectSubset<T, MaintainerProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaintainerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintainerProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaintainerProfiles
     * const maintainerProfile = await prisma.maintainerProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaintainerProfileUpdateManyArgs>(args: SelectSubset<T, MaintainerProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaintainerProfiles and returns the data updated in the database.
     * @param {MaintainerProfileUpdateManyAndReturnArgs} args - Arguments to update many MaintainerProfiles.
     * @example
     * // Update many MaintainerProfiles
     * const maintainerProfile = await prisma.maintainerProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MaintainerProfiles and only return the `user_id`
     * const maintainerProfileWithUser_idOnly = await prisma.maintainerProfile.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MaintainerProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, MaintainerProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MaintainerProfile.
     * @param {MaintainerProfileUpsertArgs} args - Arguments to update or create a MaintainerProfile.
     * @example
     * // Update or create a MaintainerProfile
     * const maintainerProfile = await prisma.maintainerProfile.upsert({
     *   create: {
     *     // ... data to create a MaintainerProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaintainerProfile we want to update
     *   }
     * })
     */
    upsert<T extends MaintainerProfileUpsertArgs>(args: SelectSubset<T, MaintainerProfileUpsertArgs<ExtArgs>>): Prisma__MaintainerProfileClient<$Result.GetResult<Prisma.$MaintainerProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MaintainerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintainerProfileCountArgs} args - Arguments to filter MaintainerProfiles to count.
     * @example
     * // Count the number of MaintainerProfiles
     * const count = await prisma.maintainerProfile.count({
     *   where: {
     *     // ... the filter for the MaintainerProfiles we want to count
     *   }
     * })
    **/
    count<T extends MaintainerProfileCountArgs>(
      args?: Subset<T, MaintainerProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaintainerProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaintainerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintainerProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MaintainerProfileAggregateArgs>(args: Subset<T, MaintainerProfileAggregateArgs>): Prisma.PrismaPromise<GetMaintainerProfileAggregateType<T>>

    /**
     * Group by MaintainerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintainerProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MaintainerProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaintainerProfileGroupByArgs['orderBy'] }
        : { orderBy?: MaintainerProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MaintainerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaintainerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaintainerProfile model
   */
  readonly fields: MaintainerProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaintainerProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaintainerProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MaintainerProfile model
   */
  interface MaintainerProfileFieldRefs {
    readonly user_id: FieldRef<"MaintainerProfile", 'String'>
    readonly bio: FieldRef<"MaintainerProfile", 'String'>
    readonly social_media: FieldRef<"MaintainerProfile", 'Json'>
    readonly created_at: FieldRef<"MaintainerProfile", 'DateTime'>
    readonly updated_at: FieldRef<"MaintainerProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MaintainerProfile findUnique
   */
  export type MaintainerProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    /**
     * Filter, which MaintainerProfile to fetch.
     */
    where: MaintainerProfileWhereUniqueInput
  }

  /**
   * MaintainerProfile findUniqueOrThrow
   */
  export type MaintainerProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    /**
     * Filter, which MaintainerProfile to fetch.
     */
    where: MaintainerProfileWhereUniqueInput
  }

  /**
   * MaintainerProfile findFirst
   */
  export type MaintainerProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    /**
     * Filter, which MaintainerProfile to fetch.
     */
    where?: MaintainerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintainerProfiles to fetch.
     */
    orderBy?: MaintainerProfileOrderByWithRelationInput | MaintainerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaintainerProfiles.
     */
    cursor?: MaintainerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintainerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintainerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaintainerProfiles.
     */
    distinct?: MaintainerProfileScalarFieldEnum | MaintainerProfileScalarFieldEnum[]
  }

  /**
   * MaintainerProfile findFirstOrThrow
   */
  export type MaintainerProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    /**
     * Filter, which MaintainerProfile to fetch.
     */
    where?: MaintainerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintainerProfiles to fetch.
     */
    orderBy?: MaintainerProfileOrderByWithRelationInput | MaintainerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaintainerProfiles.
     */
    cursor?: MaintainerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintainerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintainerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaintainerProfiles.
     */
    distinct?: MaintainerProfileScalarFieldEnum | MaintainerProfileScalarFieldEnum[]
  }

  /**
   * MaintainerProfile findMany
   */
  export type MaintainerProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    /**
     * Filter, which MaintainerProfiles to fetch.
     */
    where?: MaintainerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintainerProfiles to fetch.
     */
    orderBy?: MaintainerProfileOrderByWithRelationInput | MaintainerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaintainerProfiles.
     */
    cursor?: MaintainerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintainerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintainerProfiles.
     */
    skip?: number
    distinct?: MaintainerProfileScalarFieldEnum | MaintainerProfileScalarFieldEnum[]
  }

  /**
   * MaintainerProfile create
   */
  export type MaintainerProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a MaintainerProfile.
     */
    data: XOR<MaintainerProfileCreateInput, MaintainerProfileUncheckedCreateInput>
  }

  /**
   * MaintainerProfile createMany
   */
  export type MaintainerProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaintainerProfiles.
     */
    data: MaintainerProfileCreateManyInput | MaintainerProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaintainerProfile createManyAndReturn
   */
  export type MaintainerProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * The data used to create many MaintainerProfiles.
     */
    data: MaintainerProfileCreateManyInput | MaintainerProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaintainerProfile update
   */
  export type MaintainerProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a MaintainerProfile.
     */
    data: XOR<MaintainerProfileUpdateInput, MaintainerProfileUncheckedUpdateInput>
    /**
     * Choose, which MaintainerProfile to update.
     */
    where: MaintainerProfileWhereUniqueInput
  }

  /**
   * MaintainerProfile updateMany
   */
  export type MaintainerProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaintainerProfiles.
     */
    data: XOR<MaintainerProfileUpdateManyMutationInput, MaintainerProfileUncheckedUpdateManyInput>
    /**
     * Filter which MaintainerProfiles to update
     */
    where?: MaintainerProfileWhereInput
    /**
     * Limit how many MaintainerProfiles to update.
     */
    limit?: number
  }

  /**
   * MaintainerProfile updateManyAndReturn
   */
  export type MaintainerProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * The data used to update MaintainerProfiles.
     */
    data: XOR<MaintainerProfileUpdateManyMutationInput, MaintainerProfileUncheckedUpdateManyInput>
    /**
     * Filter which MaintainerProfiles to update
     */
    where?: MaintainerProfileWhereInput
    /**
     * Limit how many MaintainerProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaintainerProfile upsert
   */
  export type MaintainerProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the MaintainerProfile to update in case it exists.
     */
    where: MaintainerProfileWhereUniqueInput
    /**
     * In case the MaintainerProfile found by the `where` argument doesn't exist, create a new MaintainerProfile with this data.
     */
    create: XOR<MaintainerProfileCreateInput, MaintainerProfileUncheckedCreateInput>
    /**
     * In case the MaintainerProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaintainerProfileUpdateInput, MaintainerProfileUncheckedUpdateInput>
  }

  /**
   * MaintainerProfile delete
   */
  export type MaintainerProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
    /**
     * Filter which MaintainerProfile to delete.
     */
    where: MaintainerProfileWhereUniqueInput
  }

  /**
   * MaintainerProfile deleteMany
   */
  export type MaintainerProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaintainerProfiles to delete
     */
    where?: MaintainerProfileWhereInput
    /**
     * Limit how many MaintainerProfiles to delete.
     */
    limit?: number
  }

  /**
   * MaintainerProfile without action
   */
  export type MaintainerProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintainerProfile
     */
    select?: MaintainerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MaintainerProfile
     */
    omit?: MaintainerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintainerProfileInclude<ExtArgs> | null
  }


  /**
   * Model ContributorProfile
   */

  export type AggregateContributorProfile = {
    _count: ContributorProfileCountAggregateOutputType | null
    _min: ContributorProfileMinAggregateOutputType | null
    _max: ContributorProfileMaxAggregateOutputType | null
  }

  export type ContributorProfileMinAggregateOutputType = {
    user_id: string | null
    bio: string | null
    portfolio_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ContributorProfileMaxAggregateOutputType = {
    user_id: string | null
    bio: string | null
    portfolio_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ContributorProfileCountAggregateOutputType = {
    user_id: number
    skills: number
    bio: number
    portfolio_url: number
    social_media: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ContributorProfileMinAggregateInputType = {
    user_id?: true
    bio?: true
    portfolio_url?: true
    created_at?: true
    updated_at?: true
  }

  export type ContributorProfileMaxAggregateInputType = {
    user_id?: true
    bio?: true
    portfolio_url?: true
    created_at?: true
    updated_at?: true
  }

  export type ContributorProfileCountAggregateInputType = {
    user_id?: true
    skills?: true
    bio?: true
    portfolio_url?: true
    social_media?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ContributorProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContributorProfile to aggregate.
     */
    where?: ContributorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributorProfiles to fetch.
     */
    orderBy?: ContributorProfileOrderByWithRelationInput | ContributorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContributorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContributorProfiles
    **/
    _count?: true | ContributorProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContributorProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContributorProfileMaxAggregateInputType
  }

  export type GetContributorProfileAggregateType<T extends ContributorProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateContributorProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContributorProfile[P]>
      : GetScalarType<T[P], AggregateContributorProfile[P]>
  }




  export type ContributorProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContributorProfileWhereInput
    orderBy?: ContributorProfileOrderByWithAggregationInput | ContributorProfileOrderByWithAggregationInput[]
    by: ContributorProfileScalarFieldEnum[] | ContributorProfileScalarFieldEnum
    having?: ContributorProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContributorProfileCountAggregateInputType | true
    _min?: ContributorProfileMinAggregateInputType
    _max?: ContributorProfileMaxAggregateInputType
  }

  export type ContributorProfileGroupByOutputType = {
    user_id: string
    skills: string[]
    bio: string | null
    portfolio_url: string | null
    social_media: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: ContributorProfileCountAggregateOutputType | null
    _min: ContributorProfileMinAggregateOutputType | null
    _max: ContributorProfileMaxAggregateOutputType | null
  }

  type GetContributorProfileGroupByPayload<T extends ContributorProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContributorProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContributorProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContributorProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ContributorProfileGroupByOutputType[P]>
        }
      >
    >


  export type ContributorProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    skills?: boolean
    bio?: boolean
    portfolio_url?: boolean
    social_media?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributorProfile"]>

  export type ContributorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    skills?: boolean
    bio?: boolean
    portfolio_url?: boolean
    social_media?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributorProfile"]>

  export type ContributorProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    skills?: boolean
    bio?: boolean
    portfolio_url?: boolean
    social_media?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributorProfile"]>

  export type ContributorProfileSelectScalar = {
    user_id?: boolean
    skills?: boolean
    bio?: boolean
    portfolio_url?: boolean
    social_media?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ContributorProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "skills" | "bio" | "portfolio_url" | "social_media" | "created_at" | "updated_at", ExtArgs["result"]["contributorProfile"]>
  export type ContributorProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContributorProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContributorProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ContributorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContributorProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      skills: string[]
      bio: string | null
      portfolio_url: string | null
      social_media: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["contributorProfile"]>
    composites: {}
  }

  type ContributorProfileGetPayload<S extends boolean | null | undefined | ContributorProfileDefaultArgs> = $Result.GetResult<Prisma.$ContributorProfilePayload, S>

  type ContributorProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContributorProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContributorProfileCountAggregateInputType | true
    }

  export interface ContributorProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContributorProfile'], meta: { name: 'ContributorProfile' } }
    /**
     * Find zero or one ContributorProfile that matches the filter.
     * @param {ContributorProfileFindUniqueArgs} args - Arguments to find a ContributorProfile
     * @example
     * // Get one ContributorProfile
     * const contributorProfile = await prisma.contributorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContributorProfileFindUniqueArgs>(args: SelectSubset<T, ContributorProfileFindUniqueArgs<ExtArgs>>): Prisma__ContributorProfileClient<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContributorProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContributorProfileFindUniqueOrThrowArgs} args - Arguments to find a ContributorProfile
     * @example
     * // Get one ContributorProfile
     * const contributorProfile = await prisma.contributorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContributorProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ContributorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContributorProfileClient<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContributorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorProfileFindFirstArgs} args - Arguments to find a ContributorProfile
     * @example
     * // Get one ContributorProfile
     * const contributorProfile = await prisma.contributorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContributorProfileFindFirstArgs>(args?: SelectSubset<T, ContributorProfileFindFirstArgs<ExtArgs>>): Prisma__ContributorProfileClient<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContributorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorProfileFindFirstOrThrowArgs} args - Arguments to find a ContributorProfile
     * @example
     * // Get one ContributorProfile
     * const contributorProfile = await prisma.contributorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContributorProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ContributorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContributorProfileClient<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContributorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContributorProfiles
     * const contributorProfiles = await prisma.contributorProfile.findMany()
     * 
     * // Get first 10 ContributorProfiles
     * const contributorProfiles = await prisma.contributorProfile.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const contributorProfileWithUser_idOnly = await prisma.contributorProfile.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends ContributorProfileFindManyArgs>(args?: SelectSubset<T, ContributorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContributorProfile.
     * @param {ContributorProfileCreateArgs} args - Arguments to create a ContributorProfile.
     * @example
     * // Create one ContributorProfile
     * const ContributorProfile = await prisma.contributorProfile.create({
     *   data: {
     *     // ... data to create a ContributorProfile
     *   }
     * })
     * 
     */
    create<T extends ContributorProfileCreateArgs>(args: SelectSubset<T, ContributorProfileCreateArgs<ExtArgs>>): Prisma__ContributorProfileClient<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContributorProfiles.
     * @param {ContributorProfileCreateManyArgs} args - Arguments to create many ContributorProfiles.
     * @example
     * // Create many ContributorProfiles
     * const contributorProfile = await prisma.contributorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContributorProfileCreateManyArgs>(args?: SelectSubset<T, ContributorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContributorProfiles and returns the data saved in the database.
     * @param {ContributorProfileCreateManyAndReturnArgs} args - Arguments to create many ContributorProfiles.
     * @example
     * // Create many ContributorProfiles
     * const contributorProfile = await prisma.contributorProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContributorProfiles and only return the `user_id`
     * const contributorProfileWithUser_idOnly = await prisma.contributorProfile.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContributorProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ContributorProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContributorProfile.
     * @param {ContributorProfileDeleteArgs} args - Arguments to delete one ContributorProfile.
     * @example
     * // Delete one ContributorProfile
     * const ContributorProfile = await prisma.contributorProfile.delete({
     *   where: {
     *     // ... filter to delete one ContributorProfile
     *   }
     * })
     * 
     */
    delete<T extends ContributorProfileDeleteArgs>(args: SelectSubset<T, ContributorProfileDeleteArgs<ExtArgs>>): Prisma__ContributorProfileClient<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContributorProfile.
     * @param {ContributorProfileUpdateArgs} args - Arguments to update one ContributorProfile.
     * @example
     * // Update one ContributorProfile
     * const contributorProfile = await prisma.contributorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContributorProfileUpdateArgs>(args: SelectSubset<T, ContributorProfileUpdateArgs<ExtArgs>>): Prisma__ContributorProfileClient<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContributorProfiles.
     * @param {ContributorProfileDeleteManyArgs} args - Arguments to filter ContributorProfiles to delete.
     * @example
     * // Delete a few ContributorProfiles
     * const { count } = await prisma.contributorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContributorProfileDeleteManyArgs>(args?: SelectSubset<T, ContributorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContributorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContributorProfiles
     * const contributorProfile = await prisma.contributorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContributorProfileUpdateManyArgs>(args: SelectSubset<T, ContributorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContributorProfiles and returns the data updated in the database.
     * @param {ContributorProfileUpdateManyAndReturnArgs} args - Arguments to update many ContributorProfiles.
     * @example
     * // Update many ContributorProfiles
     * const contributorProfile = await prisma.contributorProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContributorProfiles and only return the `user_id`
     * const contributorProfileWithUser_idOnly = await prisma.contributorProfile.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContributorProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ContributorProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContributorProfile.
     * @param {ContributorProfileUpsertArgs} args - Arguments to update or create a ContributorProfile.
     * @example
     * // Update or create a ContributorProfile
     * const contributorProfile = await prisma.contributorProfile.upsert({
     *   create: {
     *     // ... data to create a ContributorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContributorProfile we want to update
     *   }
     * })
     */
    upsert<T extends ContributorProfileUpsertArgs>(args: SelectSubset<T, ContributorProfileUpsertArgs<ExtArgs>>): Prisma__ContributorProfileClient<$Result.GetResult<Prisma.$ContributorProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContributorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorProfileCountArgs} args - Arguments to filter ContributorProfiles to count.
     * @example
     * // Count the number of ContributorProfiles
     * const count = await prisma.contributorProfile.count({
     *   where: {
     *     // ... the filter for the ContributorProfiles we want to count
     *   }
     * })
    **/
    count<T extends ContributorProfileCountArgs>(
      args?: Subset<T, ContributorProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContributorProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContributorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContributorProfileAggregateArgs>(args: Subset<T, ContributorProfileAggregateArgs>): Prisma.PrismaPromise<GetContributorProfileAggregateType<T>>

    /**
     * Group by ContributorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributorProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContributorProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContributorProfileGroupByArgs['orderBy'] }
        : { orderBy?: ContributorProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContributorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContributorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContributorProfile model
   */
  readonly fields: ContributorProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContributorProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContributorProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContributorProfile model
   */
  interface ContributorProfileFieldRefs {
    readonly user_id: FieldRef<"ContributorProfile", 'String'>
    readonly skills: FieldRef<"ContributorProfile", 'String[]'>
    readonly bio: FieldRef<"ContributorProfile", 'String'>
    readonly portfolio_url: FieldRef<"ContributorProfile", 'String'>
    readonly social_media: FieldRef<"ContributorProfile", 'Json'>
    readonly created_at: FieldRef<"ContributorProfile", 'DateTime'>
    readonly updated_at: FieldRef<"ContributorProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContributorProfile findUnique
   */
  export type ContributorProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    /**
     * Filter, which ContributorProfile to fetch.
     */
    where: ContributorProfileWhereUniqueInput
  }

  /**
   * ContributorProfile findUniqueOrThrow
   */
  export type ContributorProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    /**
     * Filter, which ContributorProfile to fetch.
     */
    where: ContributorProfileWhereUniqueInput
  }

  /**
   * ContributorProfile findFirst
   */
  export type ContributorProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    /**
     * Filter, which ContributorProfile to fetch.
     */
    where?: ContributorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributorProfiles to fetch.
     */
    orderBy?: ContributorProfileOrderByWithRelationInput | ContributorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContributorProfiles.
     */
    cursor?: ContributorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContributorProfiles.
     */
    distinct?: ContributorProfileScalarFieldEnum | ContributorProfileScalarFieldEnum[]
  }

  /**
   * ContributorProfile findFirstOrThrow
   */
  export type ContributorProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    /**
     * Filter, which ContributorProfile to fetch.
     */
    where?: ContributorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributorProfiles to fetch.
     */
    orderBy?: ContributorProfileOrderByWithRelationInput | ContributorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContributorProfiles.
     */
    cursor?: ContributorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContributorProfiles.
     */
    distinct?: ContributorProfileScalarFieldEnum | ContributorProfileScalarFieldEnum[]
  }

  /**
   * ContributorProfile findMany
   */
  export type ContributorProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    /**
     * Filter, which ContributorProfiles to fetch.
     */
    where?: ContributorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributorProfiles to fetch.
     */
    orderBy?: ContributorProfileOrderByWithRelationInput | ContributorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContributorProfiles.
     */
    cursor?: ContributorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributorProfiles.
     */
    skip?: number
    distinct?: ContributorProfileScalarFieldEnum | ContributorProfileScalarFieldEnum[]
  }

  /**
   * ContributorProfile create
   */
  export type ContributorProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a ContributorProfile.
     */
    data: XOR<ContributorProfileCreateInput, ContributorProfileUncheckedCreateInput>
  }

  /**
   * ContributorProfile createMany
   */
  export type ContributorProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContributorProfiles.
     */
    data: ContributorProfileCreateManyInput | ContributorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContributorProfile createManyAndReturn
   */
  export type ContributorProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * The data used to create many ContributorProfiles.
     */
    data: ContributorProfileCreateManyInput | ContributorProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContributorProfile update
   */
  export type ContributorProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a ContributorProfile.
     */
    data: XOR<ContributorProfileUpdateInput, ContributorProfileUncheckedUpdateInput>
    /**
     * Choose, which ContributorProfile to update.
     */
    where: ContributorProfileWhereUniqueInput
  }

  /**
   * ContributorProfile updateMany
   */
  export type ContributorProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContributorProfiles.
     */
    data: XOR<ContributorProfileUpdateManyMutationInput, ContributorProfileUncheckedUpdateManyInput>
    /**
     * Filter which ContributorProfiles to update
     */
    where?: ContributorProfileWhereInput
    /**
     * Limit how many ContributorProfiles to update.
     */
    limit?: number
  }

  /**
   * ContributorProfile updateManyAndReturn
   */
  export type ContributorProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * The data used to update ContributorProfiles.
     */
    data: XOR<ContributorProfileUpdateManyMutationInput, ContributorProfileUncheckedUpdateManyInput>
    /**
     * Filter which ContributorProfiles to update
     */
    where?: ContributorProfileWhereInput
    /**
     * Limit how many ContributorProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContributorProfile upsert
   */
  export type ContributorProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the ContributorProfile to update in case it exists.
     */
    where: ContributorProfileWhereUniqueInput
    /**
     * In case the ContributorProfile found by the `where` argument doesn't exist, create a new ContributorProfile with this data.
     */
    create: XOR<ContributorProfileCreateInput, ContributorProfileUncheckedCreateInput>
    /**
     * In case the ContributorProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContributorProfileUpdateInput, ContributorProfileUncheckedUpdateInput>
  }

  /**
   * ContributorProfile delete
   */
  export type ContributorProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
    /**
     * Filter which ContributorProfile to delete.
     */
    where: ContributorProfileWhereUniqueInput
  }

  /**
   * ContributorProfile deleteMany
   */
  export type ContributorProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContributorProfiles to delete
     */
    where?: ContributorProfileWhereInput
    /**
     * Limit how many ContributorProfiles to delete.
     */
    limit?: number
  }

  /**
   * ContributorProfile without action
   */
  export type ContributorProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributorProfile
     */
    select?: ContributorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributorProfile
     */
    omit?: ContributorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributorProfileInclude<ExtArgs> | null
  }


  /**
   * Model AdminProfile
   */

  export type AggregateAdminProfile = {
    _count: AdminProfileCountAggregateOutputType | null
    _min: AdminProfileMinAggregateOutputType | null
    _max: AdminProfileMaxAggregateOutputType | null
  }

  export type AdminProfileMinAggregateOutputType = {
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AdminProfileMaxAggregateOutputType = {
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AdminProfileCountAggregateOutputType = {
    user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AdminProfileMinAggregateInputType = {
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type AdminProfileMaxAggregateInputType = {
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type AdminProfileCountAggregateInputType = {
    user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AdminProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminProfile to aggregate.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminProfiles
    **/
    _count?: true | AdminProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminProfileMaxAggregateInputType
  }

  export type GetAdminProfileAggregateType<T extends AdminProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminProfile[P]>
      : GetScalarType<T[P], AggregateAdminProfile[P]>
  }




  export type AdminProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminProfileWhereInput
    orderBy?: AdminProfileOrderByWithAggregationInput | AdminProfileOrderByWithAggregationInput[]
    by: AdminProfileScalarFieldEnum[] | AdminProfileScalarFieldEnum
    having?: AdminProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminProfileCountAggregateInputType | true
    _min?: AdminProfileMinAggregateInputType
    _max?: AdminProfileMaxAggregateInputType
  }

  export type AdminProfileGroupByOutputType = {
    user_id: string
    created_at: Date
    updated_at: Date
    _count: AdminProfileCountAggregateOutputType | null
    _min: AdminProfileMinAggregateOutputType | null
    _max: AdminProfileMaxAggregateOutputType | null
  }

  type GetAdminProfileGroupByPayload<T extends AdminProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminProfileGroupByOutputType[P]>
            : GetScalarType<T[P], AdminProfileGroupByOutputType[P]>
        }
      >
    >


  export type AdminProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminProfile"]>

  export type AdminProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminProfile"]>

  export type AdminProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminProfile"]>

  export type AdminProfileSelectScalar = {
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AdminProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "created_at" | "updated_at", ExtArgs["result"]["adminProfile"]>
  export type AdminProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdminProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["adminProfile"]>
    composites: {}
  }

  type AdminProfileGetPayload<S extends boolean | null | undefined | AdminProfileDefaultArgs> = $Result.GetResult<Prisma.$AdminProfilePayload, S>

  type AdminProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminProfileCountAggregateInputType | true
    }

  export interface AdminProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminProfile'], meta: { name: 'AdminProfile' } }
    /**
     * Find zero or one AdminProfile that matches the filter.
     * @param {AdminProfileFindUniqueArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminProfileFindUniqueArgs>(args: SelectSubset<T, AdminProfileFindUniqueArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminProfileFindUniqueOrThrowArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileFindFirstArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminProfileFindFirstArgs>(args?: SelectSubset<T, AdminProfileFindFirstArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileFindFirstOrThrowArgs} args - Arguments to find a AdminProfile
     * @example
     * // Get one AdminProfile
     * const adminProfile = await prisma.adminProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminProfiles
     * const adminProfiles = await prisma.adminProfile.findMany()
     * 
     * // Get first 10 AdminProfiles
     * const adminProfiles = await prisma.adminProfile.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const adminProfileWithUser_idOnly = await prisma.adminProfile.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends AdminProfileFindManyArgs>(args?: SelectSubset<T, AdminProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminProfile.
     * @param {AdminProfileCreateArgs} args - Arguments to create a AdminProfile.
     * @example
     * // Create one AdminProfile
     * const AdminProfile = await prisma.adminProfile.create({
     *   data: {
     *     // ... data to create a AdminProfile
     *   }
     * })
     * 
     */
    create<T extends AdminProfileCreateArgs>(args: SelectSubset<T, AdminProfileCreateArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminProfiles.
     * @param {AdminProfileCreateManyArgs} args - Arguments to create many AdminProfiles.
     * @example
     * // Create many AdminProfiles
     * const adminProfile = await prisma.adminProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminProfileCreateManyArgs>(args?: SelectSubset<T, AdminProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminProfiles and returns the data saved in the database.
     * @param {AdminProfileCreateManyAndReturnArgs} args - Arguments to create many AdminProfiles.
     * @example
     * // Create many AdminProfiles
     * const adminProfile = await prisma.adminProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminProfiles and only return the `user_id`
     * const adminProfileWithUser_idOnly = await prisma.adminProfile.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminProfile.
     * @param {AdminProfileDeleteArgs} args - Arguments to delete one AdminProfile.
     * @example
     * // Delete one AdminProfile
     * const AdminProfile = await prisma.adminProfile.delete({
     *   where: {
     *     // ... filter to delete one AdminProfile
     *   }
     * })
     * 
     */
    delete<T extends AdminProfileDeleteArgs>(args: SelectSubset<T, AdminProfileDeleteArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminProfile.
     * @param {AdminProfileUpdateArgs} args - Arguments to update one AdminProfile.
     * @example
     * // Update one AdminProfile
     * const adminProfile = await prisma.adminProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminProfileUpdateArgs>(args: SelectSubset<T, AdminProfileUpdateArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminProfiles.
     * @param {AdminProfileDeleteManyArgs} args - Arguments to filter AdminProfiles to delete.
     * @example
     * // Delete a few AdminProfiles
     * const { count } = await prisma.adminProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminProfileDeleteManyArgs>(args?: SelectSubset<T, AdminProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminProfiles
     * const adminProfile = await prisma.adminProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminProfileUpdateManyArgs>(args: SelectSubset<T, AdminProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminProfiles and returns the data updated in the database.
     * @param {AdminProfileUpdateManyAndReturnArgs} args - Arguments to update many AdminProfiles.
     * @example
     * // Update many AdminProfiles
     * const adminProfile = await prisma.adminProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminProfiles and only return the `user_id`
     * const adminProfileWithUser_idOnly = await prisma.adminProfile.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminProfile.
     * @param {AdminProfileUpsertArgs} args - Arguments to update or create a AdminProfile.
     * @example
     * // Update or create a AdminProfile
     * const adminProfile = await prisma.adminProfile.upsert({
     *   create: {
     *     // ... data to create a AdminProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminProfile we want to update
     *   }
     * })
     */
    upsert<T extends AdminProfileUpsertArgs>(args: SelectSubset<T, AdminProfileUpsertArgs<ExtArgs>>): Prisma__AdminProfileClient<$Result.GetResult<Prisma.$AdminProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileCountArgs} args - Arguments to filter AdminProfiles to count.
     * @example
     * // Count the number of AdminProfiles
     * const count = await prisma.adminProfile.count({
     *   where: {
     *     // ... the filter for the AdminProfiles we want to count
     *   }
     * })
    **/
    count<T extends AdminProfileCountArgs>(
      args?: Subset<T, AdminProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminProfileAggregateArgs>(args: Subset<T, AdminProfileAggregateArgs>): Prisma.PrismaPromise<GetAdminProfileAggregateType<T>>

    /**
     * Group by AdminProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminProfileGroupByArgs['orderBy'] }
        : { orderBy?: AdminProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminProfile model
   */
  readonly fields: AdminProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminProfile model
   */
  interface AdminProfileFieldRefs {
    readonly user_id: FieldRef<"AdminProfile", 'String'>
    readonly created_at: FieldRef<"AdminProfile", 'DateTime'>
    readonly updated_at: FieldRef<"AdminProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminProfile findUnique
   */
  export type AdminProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile findUniqueOrThrow
   */
  export type AdminProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile findFirst
   */
  export type AdminProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminProfiles.
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminProfiles.
     */
    distinct?: AdminProfileScalarFieldEnum | AdminProfileScalarFieldEnum[]
  }

  /**
   * AdminProfile findFirstOrThrow
   */
  export type AdminProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfile to fetch.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminProfiles.
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminProfiles.
     */
    distinct?: AdminProfileScalarFieldEnum | AdminProfileScalarFieldEnum[]
  }

  /**
   * AdminProfile findMany
   */
  export type AdminProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter, which AdminProfiles to fetch.
     */
    where?: AdminProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminProfiles to fetch.
     */
    orderBy?: AdminProfileOrderByWithRelationInput | AdminProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminProfiles.
     */
    cursor?: AdminProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminProfiles.
     */
    skip?: number
    distinct?: AdminProfileScalarFieldEnum | AdminProfileScalarFieldEnum[]
  }

  /**
   * AdminProfile create
   */
  export type AdminProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminProfile.
     */
    data: XOR<AdminProfileCreateInput, AdminProfileUncheckedCreateInput>
  }

  /**
   * AdminProfile createMany
   */
  export type AdminProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminProfiles.
     */
    data: AdminProfileCreateManyInput | AdminProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminProfile createManyAndReturn
   */
  export type AdminProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * The data used to create many AdminProfiles.
     */
    data: AdminProfileCreateManyInput | AdminProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminProfile update
   */
  export type AdminProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminProfile.
     */
    data: XOR<AdminProfileUpdateInput, AdminProfileUncheckedUpdateInput>
    /**
     * Choose, which AdminProfile to update.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile updateMany
   */
  export type AdminProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminProfiles.
     */
    data: XOR<AdminProfileUpdateManyMutationInput, AdminProfileUncheckedUpdateManyInput>
    /**
     * Filter which AdminProfiles to update
     */
    where?: AdminProfileWhereInput
    /**
     * Limit how many AdminProfiles to update.
     */
    limit?: number
  }

  /**
   * AdminProfile updateManyAndReturn
   */
  export type AdminProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * The data used to update AdminProfiles.
     */
    data: XOR<AdminProfileUpdateManyMutationInput, AdminProfileUncheckedUpdateManyInput>
    /**
     * Filter which AdminProfiles to update
     */
    where?: AdminProfileWhereInput
    /**
     * Limit how many AdminProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminProfile upsert
   */
  export type AdminProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminProfile to update in case it exists.
     */
    where: AdminProfileWhereUniqueInput
    /**
     * In case the AdminProfile found by the `where` argument doesn't exist, create a new AdminProfile with this data.
     */
    create: XOR<AdminProfileCreateInput, AdminProfileUncheckedCreateInput>
    /**
     * In case the AdminProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminProfileUpdateInput, AdminProfileUncheckedUpdateInput>
  }

  /**
   * AdminProfile delete
   */
  export type AdminProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
    /**
     * Filter which AdminProfile to delete.
     */
    where: AdminProfileWhereUniqueInput
  }

  /**
   * AdminProfile deleteMany
   */
  export type AdminProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminProfiles to delete
     */
    where?: AdminProfileWhereInput
    /**
     * Limit how many AdminProfiles to delete.
     */
    limit?: number
  }

  /**
   * AdminProfile without action
   */
  export type AdminProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminProfile
     */
    select?: AdminProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminProfile
     */
    omit?: AdminProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminProfileInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletMinAggregateOutputType = {
    wallet_id: string | null
    user_id: string | null
    address: string | null
    is_primary: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WalletMaxAggregateOutputType = {
    wallet_id: string | null
    user_id: string | null
    address: string | null
    is_primary: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WalletCountAggregateOutputType = {
    wallet_id: number
    user_id: number
    address: number
    is_primary: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type WalletMinAggregateInputType = {
    wallet_id?: true
    user_id?: true
    address?: true
    is_primary?: true
    created_at?: true
    updated_at?: true
  }

  export type WalletMaxAggregateInputType = {
    wallet_id?: true
    user_id?: true
    address?: true
    is_primary?: true
    created_at?: true
    updated_at?: true
  }

  export type WalletCountAggregateInputType = {
    wallet_id?: true
    user_id?: true
    address?: true
    is_primary?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    wallet_id: string
    user_id: string
    address: string
    is_primary: boolean
    created_at: Date
    updated_at: Date
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    wallet_id?: boolean
    user_id?: boolean
    address?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    wallet_id?: boolean
    user_id?: boolean
    address?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    wallet_id?: boolean
    user_id?: boolean
    address?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    wallet_id?: boolean
    user_id?: boolean
    address?: boolean
    is_primary?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"wallet_id" | "user_id" | "address" | "is_primary" | "created_at" | "updated_at", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      wallet_id: string
      user_id: string
      address: string
      is_primary: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `wallet_id`
     * const walletWithWallet_idOnly = await prisma.wallet.findMany({ select: { wallet_id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `wallet_id`
     * const walletWithWallet_idOnly = await prisma.wallet.createManyAndReturn({
     *   select: { wallet_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `wallet_id`
     * const walletWithWallet_idOnly = await prisma.wallet.updateManyAndReturn({
     *   select: { wallet_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly wallet_id: FieldRef<"Wallet", 'String'>
    readonly user_id: FieldRef<"Wallet", 'String'>
    readonly address: FieldRef<"Wallet", 'String'>
    readonly is_primary: FieldRef<"Wallet", 'Boolean'>
    readonly created_at: FieldRef<"Wallet", 'DateTime'>
    readonly updated_at: FieldRef<"Wallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    project_id: string | null
    name: string | null
    github_handle: string | null
    short_description: string | null
    description: string | null
    category: $Enums.ProjectCategory | null
    status: $Enums.ProjectStatus | null
    created_by: string | null
    created_at: Date | null
    updated_at: Date | null
    reviewed_at: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    project_id: string | null
    name: string | null
    github_handle: string | null
    short_description: string | null
    description: string | null
    category: $Enums.ProjectCategory | null
    status: $Enums.ProjectStatus | null
    created_by: string | null
    created_at: Date | null
    updated_at: Date | null
    reviewed_at: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    project_id: number
    name: number
    github_handle: number
    short_description: number
    description: number
    tech_stack: number
    category: number
    status: number
    created_by: number
    created_at: number
    updated_at: number
    reviewed_at: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    project_id?: true
    name?: true
    github_handle?: true
    short_description?: true
    description?: true
    category?: true
    status?: true
    created_by?: true
    created_at?: true
    updated_at?: true
    reviewed_at?: true
  }

  export type ProjectMaxAggregateInputType = {
    project_id?: true
    name?: true
    github_handle?: true
    short_description?: true
    description?: true
    category?: true
    status?: true
    created_by?: true
    created_at?: true
    updated_at?: true
    reviewed_at?: true
  }

  export type ProjectCountAggregateInputType = {
    project_id?: true
    name?: true
    github_handle?: true
    short_description?: true
    description?: true
    tech_stack?: true
    category?: true
    status?: true
    created_by?: true
    created_at?: true
    updated_at?: true
    reviewed_at?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    project_id: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack: string[]
    category: $Enums.ProjectCategory
    status: $Enums.ProjectStatus
    created_by: string
    created_at: Date
    updated_at: Date
    reviewed_at: Date | null
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    project_id?: boolean
    name?: boolean
    github_handle?: boolean
    short_description?: boolean
    description?: boolean
    tech_stack?: boolean
    category?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    reviewed_at?: boolean
    repositories?: boolean | Project$repositoriesArgs<ExtArgs>
    maintainers?: boolean | Project$maintainersArgs<ExtArgs>
    reviews?: boolean | Project$reviewsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    project_id?: boolean
    name?: boolean
    github_handle?: boolean
    short_description?: boolean
    description?: boolean
    tech_stack?: boolean
    category?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    reviewed_at?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    project_id?: boolean
    name?: boolean
    github_handle?: boolean
    short_description?: boolean
    description?: boolean
    tech_stack?: boolean
    category?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    reviewed_at?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    project_id?: boolean
    name?: boolean
    github_handle?: boolean
    short_description?: boolean
    description?: boolean
    tech_stack?: boolean
    category?: boolean
    status?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    reviewed_at?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"project_id" | "name" | "github_handle" | "short_description" | "description" | "tech_stack" | "category" | "status" | "created_by" | "created_at" | "updated_at" | "reviewed_at", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repositories?: boolean | Project$repositoriesArgs<ExtArgs>
    maintainers?: boolean | Project$maintainersArgs<ExtArgs>
    reviews?: boolean | Project$reviewsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      repositories: Prisma.$RepositoryPayload<ExtArgs>[]
      maintainers: Prisma.$ProjectMaintainerPayload<ExtArgs>[]
      reviews: Prisma.$ProjectReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      project_id: string
      name: string
      github_handle: string
      short_description: string
      description: string
      tech_stack: string[]
      category: $Enums.ProjectCategory
      status: $Enums.ProjectStatus
      created_by: string
      created_at: Date
      updated_at: Date
      reviewed_at: Date | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `project_id`
     * const projectWithProject_idOnly = await prisma.project.findMany({ select: { project_id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `project_id`
     * const projectWithProject_idOnly = await prisma.project.createManyAndReturn({
     *   select: { project_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `project_id`
     * const projectWithProject_idOnly = await prisma.project.updateManyAndReturn({
     *   select: { project_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repositories<T extends Project$repositoriesArgs<ExtArgs> = {}>(args?: Subset<T, Project$repositoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    maintainers<T extends Project$maintainersArgs<ExtArgs> = {}>(args?: Subset<T, Project$maintainersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Project$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Project$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly project_id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly github_handle: FieldRef<"Project", 'String'>
    readonly short_description: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly tech_stack: FieldRef<"Project", 'String[]'>
    readonly category: FieldRef<"Project", 'ProjectCategory'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly created_by: FieldRef<"Project", 'String'>
    readonly created_at: FieldRef<"Project", 'DateTime'>
    readonly updated_at: FieldRef<"Project", 'DateTime'>
    readonly reviewed_at: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.repositories
   */
  export type Project$repositoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    where?: RepositoryWhereInput
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    cursor?: RepositoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Project.maintainers
   */
  export type Project$maintainersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    where?: ProjectMaintainerWhereInput
    orderBy?: ProjectMaintainerOrderByWithRelationInput | ProjectMaintainerOrderByWithRelationInput[]
    cursor?: ProjectMaintainerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMaintainerScalarFieldEnum | ProjectMaintainerScalarFieldEnum[]
  }

  /**
   * Project.reviews
   */
  export type Project$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    where?: ProjectReviewWhereInput
    orderBy?: ProjectReviewOrderByWithRelationInput | ProjectReviewOrderByWithRelationInput[]
    cursor?: ProjectReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectReviewScalarFieldEnum | ProjectReviewScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Repository
   */

  export type AggregateRepository = {
    _count: RepositoryCountAggregateOutputType | null
    _avg: RepositoryAvgAggregateOutputType | null
    _sum: RepositorySumAggregateOutputType | null
    _min: RepositoryMinAggregateOutputType | null
    _max: RepositoryMaxAggregateOutputType | null
  }

  export type RepositoryAvgAggregateOutputType = {
    github_repo_id: number | null
  }

  export type RepositorySumAggregateOutputType = {
    github_repo_id: bigint | null
  }

  export type RepositoryMinAggregateOutputType = {
    github_repo_id: bigint | null
    project_id: string | null
    github_url: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RepositoryMaxAggregateOutputType = {
    github_repo_id: bigint | null
    project_id: string | null
    github_url: string | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RepositoryCountAggregateOutputType = {
    github_repo_id: number
    project_id: number
    github_url: number
    name: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type RepositoryAvgAggregateInputType = {
    github_repo_id?: true
  }

  export type RepositorySumAggregateInputType = {
    github_repo_id?: true
  }

  export type RepositoryMinAggregateInputType = {
    github_repo_id?: true
    project_id?: true
    github_url?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type RepositoryMaxAggregateInputType = {
    github_repo_id?: true
    project_id?: true
    github_url?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type RepositoryCountAggregateInputType = {
    github_repo_id?: true
    project_id?: true
    github_url?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type RepositoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repository to aggregate.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Repositories
    **/
    _count?: true | RepositoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepositoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepositorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepositoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepositoryMaxAggregateInputType
  }

  export type GetRepositoryAggregateType<T extends RepositoryAggregateArgs> = {
        [P in keyof T & keyof AggregateRepository]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepository[P]>
      : GetScalarType<T[P], AggregateRepository[P]>
  }




  export type RepositoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepositoryWhereInput
    orderBy?: RepositoryOrderByWithAggregationInput | RepositoryOrderByWithAggregationInput[]
    by: RepositoryScalarFieldEnum[] | RepositoryScalarFieldEnum
    having?: RepositoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepositoryCountAggregateInputType | true
    _avg?: RepositoryAvgAggregateInputType
    _sum?: RepositorySumAggregateInputType
    _min?: RepositoryMinAggregateInputType
    _max?: RepositoryMaxAggregateInputType
  }

  export type RepositoryGroupByOutputType = {
    github_repo_id: bigint
    project_id: string
    github_url: string
    name: string
    description: string | null
    created_at: Date
    updated_at: Date
    _count: RepositoryCountAggregateOutputType | null
    _avg: RepositoryAvgAggregateOutputType | null
    _sum: RepositorySumAggregateOutputType | null
    _min: RepositoryMinAggregateOutputType | null
    _max: RepositoryMaxAggregateOutputType | null
  }

  type GetRepositoryGroupByPayload<T extends RepositoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepositoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepositoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepositoryGroupByOutputType[P]>
            : GetScalarType<T[P], RepositoryGroupByOutputType[P]>
        }
      >
    >


  export type RepositorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    github_repo_id?: boolean
    project_id?: boolean
    github_url?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repository"]>

  export type RepositorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    github_repo_id?: boolean
    project_id?: boolean
    github_url?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repository"]>

  export type RepositorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    github_repo_id?: boolean
    project_id?: boolean
    github_url?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repository"]>

  export type RepositorySelectScalar = {
    github_repo_id?: boolean
    project_id?: boolean
    github_url?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type RepositoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"github_repo_id" | "project_id" | "github_url" | "name" | "description" | "created_at" | "updated_at", ExtArgs["result"]["repository"]>
  export type RepositoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type RepositoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type RepositoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $RepositoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Repository"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      github_repo_id: bigint
      project_id: string
      github_url: string
      name: string
      description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["repository"]>
    composites: {}
  }

  type RepositoryGetPayload<S extends boolean | null | undefined | RepositoryDefaultArgs> = $Result.GetResult<Prisma.$RepositoryPayload, S>

  type RepositoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepositoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepositoryCountAggregateInputType | true
    }

  export interface RepositoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Repository'], meta: { name: 'Repository' } }
    /**
     * Find zero or one Repository that matches the filter.
     * @param {RepositoryFindUniqueArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepositoryFindUniqueArgs>(args: SelectSubset<T, RepositoryFindUniqueArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Repository that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepositoryFindUniqueOrThrowArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepositoryFindUniqueOrThrowArgs>(args: SelectSubset<T, RepositoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repository that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindFirstArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepositoryFindFirstArgs>(args?: SelectSubset<T, RepositoryFindFirstArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repository that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindFirstOrThrowArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepositoryFindFirstOrThrowArgs>(args?: SelectSubset<T, RepositoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Repositories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Repositories
     * const repositories = await prisma.repository.findMany()
     * 
     * // Get first 10 Repositories
     * const repositories = await prisma.repository.findMany({ take: 10 })
     * 
     * // Only select the `github_repo_id`
     * const repositoryWithGithub_repo_idOnly = await prisma.repository.findMany({ select: { github_repo_id: true } })
     * 
     */
    findMany<T extends RepositoryFindManyArgs>(args?: SelectSubset<T, RepositoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Repository.
     * @param {RepositoryCreateArgs} args - Arguments to create a Repository.
     * @example
     * // Create one Repository
     * const Repository = await prisma.repository.create({
     *   data: {
     *     // ... data to create a Repository
     *   }
     * })
     * 
     */
    create<T extends RepositoryCreateArgs>(args: SelectSubset<T, RepositoryCreateArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Repositories.
     * @param {RepositoryCreateManyArgs} args - Arguments to create many Repositories.
     * @example
     * // Create many Repositories
     * const repository = await prisma.repository.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepositoryCreateManyArgs>(args?: SelectSubset<T, RepositoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Repositories and returns the data saved in the database.
     * @param {RepositoryCreateManyAndReturnArgs} args - Arguments to create many Repositories.
     * @example
     * // Create many Repositories
     * const repository = await prisma.repository.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Repositories and only return the `github_repo_id`
     * const repositoryWithGithub_repo_idOnly = await prisma.repository.createManyAndReturn({
     *   select: { github_repo_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepositoryCreateManyAndReturnArgs>(args?: SelectSubset<T, RepositoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Repository.
     * @param {RepositoryDeleteArgs} args - Arguments to delete one Repository.
     * @example
     * // Delete one Repository
     * const Repository = await prisma.repository.delete({
     *   where: {
     *     // ... filter to delete one Repository
     *   }
     * })
     * 
     */
    delete<T extends RepositoryDeleteArgs>(args: SelectSubset<T, RepositoryDeleteArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Repository.
     * @param {RepositoryUpdateArgs} args - Arguments to update one Repository.
     * @example
     * // Update one Repository
     * const repository = await prisma.repository.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepositoryUpdateArgs>(args: SelectSubset<T, RepositoryUpdateArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Repositories.
     * @param {RepositoryDeleteManyArgs} args - Arguments to filter Repositories to delete.
     * @example
     * // Delete a few Repositories
     * const { count } = await prisma.repository.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepositoryDeleteManyArgs>(args?: SelectSubset<T, RepositoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Repositories
     * const repository = await prisma.repository.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepositoryUpdateManyArgs>(args: SelectSubset<T, RepositoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repositories and returns the data updated in the database.
     * @param {RepositoryUpdateManyAndReturnArgs} args - Arguments to update many Repositories.
     * @example
     * // Update many Repositories
     * const repository = await prisma.repository.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Repositories and only return the `github_repo_id`
     * const repositoryWithGithub_repo_idOnly = await prisma.repository.updateManyAndReturn({
     *   select: { github_repo_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepositoryUpdateManyAndReturnArgs>(args: SelectSubset<T, RepositoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Repository.
     * @param {RepositoryUpsertArgs} args - Arguments to update or create a Repository.
     * @example
     * // Update or create a Repository
     * const repository = await prisma.repository.upsert({
     *   create: {
     *     // ... data to create a Repository
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Repository we want to update
     *   }
     * })
     */
    upsert<T extends RepositoryUpsertArgs>(args: SelectSubset<T, RepositoryUpsertArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Repositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryCountArgs} args - Arguments to filter Repositories to count.
     * @example
     * // Count the number of Repositories
     * const count = await prisma.repository.count({
     *   where: {
     *     // ... the filter for the Repositories we want to count
     *   }
     * })
    **/
    count<T extends RepositoryCountArgs>(
      args?: Subset<T, RepositoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepositoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Repository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepositoryAggregateArgs>(args: Subset<T, RepositoryAggregateArgs>): Prisma.PrismaPromise<GetRepositoryAggregateType<T>>

    /**
     * Group by Repository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepositoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepositoryGroupByArgs['orderBy'] }
        : { orderBy?: RepositoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepositoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepositoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Repository model
   */
  readonly fields: RepositoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Repository.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepositoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Repository model
   */
  interface RepositoryFieldRefs {
    readonly github_repo_id: FieldRef<"Repository", 'BigInt'>
    readonly project_id: FieldRef<"Repository", 'String'>
    readonly github_url: FieldRef<"Repository", 'String'>
    readonly name: FieldRef<"Repository", 'String'>
    readonly description: FieldRef<"Repository", 'String'>
    readonly created_at: FieldRef<"Repository", 'DateTime'>
    readonly updated_at: FieldRef<"Repository", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Repository findUnique
   */
  export type RepositoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository findUniqueOrThrow
   */
  export type RepositoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository findFirst
   */
  export type RepositoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repositories.
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repositories.
     */
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Repository findFirstOrThrow
   */
  export type RepositoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repositories.
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repositories.
     */
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Repository findMany
   */
  export type RepositoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repositories to fetch.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Repositories.
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Repository create
   */
  export type RepositoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Repository.
     */
    data: XOR<RepositoryCreateInput, RepositoryUncheckedCreateInput>
  }

  /**
   * Repository createMany
   */
  export type RepositoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Repositories.
     */
    data: RepositoryCreateManyInput | RepositoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Repository createManyAndReturn
   */
  export type RepositoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * The data used to create many Repositories.
     */
    data: RepositoryCreateManyInput | RepositoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Repository update
   */
  export type RepositoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Repository.
     */
    data: XOR<RepositoryUpdateInput, RepositoryUncheckedUpdateInput>
    /**
     * Choose, which Repository to update.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository updateMany
   */
  export type RepositoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Repositories.
     */
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyInput>
    /**
     * Filter which Repositories to update
     */
    where?: RepositoryWhereInput
    /**
     * Limit how many Repositories to update.
     */
    limit?: number
  }

  /**
   * Repository updateManyAndReturn
   */
  export type RepositoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * The data used to update Repositories.
     */
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyInput>
    /**
     * Filter which Repositories to update
     */
    where?: RepositoryWhereInput
    /**
     * Limit how many Repositories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Repository upsert
   */
  export type RepositoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Repository to update in case it exists.
     */
    where: RepositoryWhereUniqueInput
    /**
     * In case the Repository found by the `where` argument doesn't exist, create a new Repository with this data.
     */
    create: XOR<RepositoryCreateInput, RepositoryUncheckedCreateInput>
    /**
     * In case the Repository was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepositoryUpdateInput, RepositoryUncheckedUpdateInput>
  }

  /**
   * Repository delete
   */
  export type RepositoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter which Repository to delete.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository deleteMany
   */
  export type RepositoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repositories to delete
     */
    where?: RepositoryWhereInput
    /**
     * Limit how many Repositories to delete.
     */
    limit?: number
  }

  /**
   * Repository without action
   */
  export type RepositoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
  }


  /**
   * Model ProjectMaintainer
   */

  export type AggregateProjectMaintainer = {
    _count: ProjectMaintainerCountAggregateOutputType | null
    _min: ProjectMaintainerMinAggregateOutputType | null
    _max: ProjectMaintainerMaxAggregateOutputType | null
  }

  export type ProjectMaintainerMinAggregateOutputType = {
    id: string | null
    project_id: string | null
    maintainer_id: string | null
    is_owner: boolean | null
    created_at: Date | null
    updated_at: Date | null
    is_active: boolean | null
  }

  export type ProjectMaintainerMaxAggregateOutputType = {
    id: string | null
    project_id: string | null
    maintainer_id: string | null
    is_owner: boolean | null
    created_at: Date | null
    updated_at: Date | null
    is_active: boolean | null
  }

  export type ProjectMaintainerCountAggregateOutputType = {
    id: number
    project_id: number
    maintainer_id: number
    is_owner: number
    created_at: number
    updated_at: number
    is_active: number
    _all: number
  }


  export type ProjectMaintainerMinAggregateInputType = {
    id?: true
    project_id?: true
    maintainer_id?: true
    is_owner?: true
    created_at?: true
    updated_at?: true
    is_active?: true
  }

  export type ProjectMaintainerMaxAggregateInputType = {
    id?: true
    project_id?: true
    maintainer_id?: true
    is_owner?: true
    created_at?: true
    updated_at?: true
    is_active?: true
  }

  export type ProjectMaintainerCountAggregateInputType = {
    id?: true
    project_id?: true
    maintainer_id?: true
    is_owner?: true
    created_at?: true
    updated_at?: true
    is_active?: true
    _all?: true
  }

  export type ProjectMaintainerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMaintainer to aggregate.
     */
    where?: ProjectMaintainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMaintainers to fetch.
     */
    orderBy?: ProjectMaintainerOrderByWithRelationInput | ProjectMaintainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectMaintainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMaintainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMaintainers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectMaintainers
    **/
    _count?: true | ProjectMaintainerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMaintainerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaintainerMaxAggregateInputType
  }

  export type GetProjectMaintainerAggregateType<T extends ProjectMaintainerAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectMaintainer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectMaintainer[P]>
      : GetScalarType<T[P], AggregateProjectMaintainer[P]>
  }




  export type ProjectMaintainerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMaintainerWhereInput
    orderBy?: ProjectMaintainerOrderByWithAggregationInput | ProjectMaintainerOrderByWithAggregationInput[]
    by: ProjectMaintainerScalarFieldEnum[] | ProjectMaintainerScalarFieldEnum
    having?: ProjectMaintainerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectMaintainerCountAggregateInputType | true
    _min?: ProjectMaintainerMinAggregateInputType
    _max?: ProjectMaintainerMaxAggregateInputType
  }

  export type ProjectMaintainerGroupByOutputType = {
    id: string
    project_id: string
    maintainer_id: string
    is_owner: boolean
    created_at: Date
    updated_at: Date
    is_active: boolean
    _count: ProjectMaintainerCountAggregateOutputType | null
    _min: ProjectMaintainerMinAggregateOutputType | null
    _max: ProjectMaintainerMaxAggregateOutputType | null
  }

  type GetProjectMaintainerGroupByPayload<T extends ProjectMaintainerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectMaintainerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectMaintainerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectMaintainerGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectMaintainerGroupByOutputType[P]>
        }
      >
    >


  export type ProjectMaintainerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    maintainer_id?: boolean
    is_owner?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    maintainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMaintainer"]>

  export type ProjectMaintainerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    maintainer_id?: boolean
    is_owner?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    maintainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMaintainer"]>

  export type ProjectMaintainerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_id?: boolean
    maintainer_id?: boolean
    is_owner?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    maintainer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMaintainer"]>

  export type ProjectMaintainerSelectScalar = {
    id?: boolean
    project_id?: boolean
    maintainer_id?: boolean
    is_owner?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_active?: boolean
  }

  export type ProjectMaintainerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "project_id" | "maintainer_id" | "is_owner" | "created_at" | "updated_at" | "is_active", ExtArgs["result"]["projectMaintainer"]>
  export type ProjectMaintainerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    maintainer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectMaintainerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    maintainer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectMaintainerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    maintainer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectMaintainerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectMaintainer"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      maintainer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      project_id: string
      maintainer_id: string
      is_owner: boolean
      created_at: Date
      updated_at: Date
      is_active: boolean
    }, ExtArgs["result"]["projectMaintainer"]>
    composites: {}
  }

  type ProjectMaintainerGetPayload<S extends boolean | null | undefined | ProjectMaintainerDefaultArgs> = $Result.GetResult<Prisma.$ProjectMaintainerPayload, S>

  type ProjectMaintainerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectMaintainerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectMaintainerCountAggregateInputType | true
    }

  export interface ProjectMaintainerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectMaintainer'], meta: { name: 'ProjectMaintainer' } }
    /**
     * Find zero or one ProjectMaintainer that matches the filter.
     * @param {ProjectMaintainerFindUniqueArgs} args - Arguments to find a ProjectMaintainer
     * @example
     * // Get one ProjectMaintainer
     * const projectMaintainer = await prisma.projectMaintainer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectMaintainerFindUniqueArgs>(args: SelectSubset<T, ProjectMaintainerFindUniqueArgs<ExtArgs>>): Prisma__ProjectMaintainerClient<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectMaintainer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectMaintainerFindUniqueOrThrowArgs} args - Arguments to find a ProjectMaintainer
     * @example
     * // Get one ProjectMaintainer
     * const projectMaintainer = await prisma.projectMaintainer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectMaintainerFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectMaintainerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectMaintainerClient<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMaintainer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMaintainerFindFirstArgs} args - Arguments to find a ProjectMaintainer
     * @example
     * // Get one ProjectMaintainer
     * const projectMaintainer = await prisma.projectMaintainer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectMaintainerFindFirstArgs>(args?: SelectSubset<T, ProjectMaintainerFindFirstArgs<ExtArgs>>): Prisma__ProjectMaintainerClient<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMaintainer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMaintainerFindFirstOrThrowArgs} args - Arguments to find a ProjectMaintainer
     * @example
     * // Get one ProjectMaintainer
     * const projectMaintainer = await prisma.projectMaintainer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectMaintainerFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectMaintainerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectMaintainerClient<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectMaintainers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMaintainerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectMaintainers
     * const projectMaintainers = await prisma.projectMaintainer.findMany()
     * 
     * // Get first 10 ProjectMaintainers
     * const projectMaintainers = await prisma.projectMaintainer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectMaintainerWithIdOnly = await prisma.projectMaintainer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectMaintainerFindManyArgs>(args?: SelectSubset<T, ProjectMaintainerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectMaintainer.
     * @param {ProjectMaintainerCreateArgs} args - Arguments to create a ProjectMaintainer.
     * @example
     * // Create one ProjectMaintainer
     * const ProjectMaintainer = await prisma.projectMaintainer.create({
     *   data: {
     *     // ... data to create a ProjectMaintainer
     *   }
     * })
     * 
     */
    create<T extends ProjectMaintainerCreateArgs>(args: SelectSubset<T, ProjectMaintainerCreateArgs<ExtArgs>>): Prisma__ProjectMaintainerClient<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectMaintainers.
     * @param {ProjectMaintainerCreateManyArgs} args - Arguments to create many ProjectMaintainers.
     * @example
     * // Create many ProjectMaintainers
     * const projectMaintainer = await prisma.projectMaintainer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectMaintainerCreateManyArgs>(args?: SelectSubset<T, ProjectMaintainerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectMaintainers and returns the data saved in the database.
     * @param {ProjectMaintainerCreateManyAndReturnArgs} args - Arguments to create many ProjectMaintainers.
     * @example
     * // Create many ProjectMaintainers
     * const projectMaintainer = await prisma.projectMaintainer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectMaintainers and only return the `id`
     * const projectMaintainerWithIdOnly = await prisma.projectMaintainer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectMaintainerCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectMaintainerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectMaintainer.
     * @param {ProjectMaintainerDeleteArgs} args - Arguments to delete one ProjectMaintainer.
     * @example
     * // Delete one ProjectMaintainer
     * const ProjectMaintainer = await prisma.projectMaintainer.delete({
     *   where: {
     *     // ... filter to delete one ProjectMaintainer
     *   }
     * })
     * 
     */
    delete<T extends ProjectMaintainerDeleteArgs>(args: SelectSubset<T, ProjectMaintainerDeleteArgs<ExtArgs>>): Prisma__ProjectMaintainerClient<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectMaintainer.
     * @param {ProjectMaintainerUpdateArgs} args - Arguments to update one ProjectMaintainer.
     * @example
     * // Update one ProjectMaintainer
     * const projectMaintainer = await prisma.projectMaintainer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectMaintainerUpdateArgs>(args: SelectSubset<T, ProjectMaintainerUpdateArgs<ExtArgs>>): Prisma__ProjectMaintainerClient<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectMaintainers.
     * @param {ProjectMaintainerDeleteManyArgs} args - Arguments to filter ProjectMaintainers to delete.
     * @example
     * // Delete a few ProjectMaintainers
     * const { count } = await prisma.projectMaintainer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectMaintainerDeleteManyArgs>(args?: SelectSubset<T, ProjectMaintainerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMaintainers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMaintainerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectMaintainers
     * const projectMaintainer = await prisma.projectMaintainer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectMaintainerUpdateManyArgs>(args: SelectSubset<T, ProjectMaintainerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMaintainers and returns the data updated in the database.
     * @param {ProjectMaintainerUpdateManyAndReturnArgs} args - Arguments to update many ProjectMaintainers.
     * @example
     * // Update many ProjectMaintainers
     * const projectMaintainer = await prisma.projectMaintainer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectMaintainers and only return the `id`
     * const projectMaintainerWithIdOnly = await prisma.projectMaintainer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectMaintainerUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectMaintainerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectMaintainer.
     * @param {ProjectMaintainerUpsertArgs} args - Arguments to update or create a ProjectMaintainer.
     * @example
     * // Update or create a ProjectMaintainer
     * const projectMaintainer = await prisma.projectMaintainer.upsert({
     *   create: {
     *     // ... data to create a ProjectMaintainer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectMaintainer we want to update
     *   }
     * })
     */
    upsert<T extends ProjectMaintainerUpsertArgs>(args: SelectSubset<T, ProjectMaintainerUpsertArgs<ExtArgs>>): Prisma__ProjectMaintainerClient<$Result.GetResult<Prisma.$ProjectMaintainerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectMaintainers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMaintainerCountArgs} args - Arguments to filter ProjectMaintainers to count.
     * @example
     * // Count the number of ProjectMaintainers
     * const count = await prisma.projectMaintainer.count({
     *   where: {
     *     // ... the filter for the ProjectMaintainers we want to count
     *   }
     * })
    **/
    count<T extends ProjectMaintainerCountArgs>(
      args?: Subset<T, ProjectMaintainerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectMaintainerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectMaintainer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMaintainerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectMaintainerAggregateArgs>(args: Subset<T, ProjectMaintainerAggregateArgs>): Prisma.PrismaPromise<GetProjectMaintainerAggregateType<T>>

    /**
     * Group by ProjectMaintainer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMaintainerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectMaintainerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectMaintainerGroupByArgs['orderBy'] }
        : { orderBy?: ProjectMaintainerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectMaintainerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectMaintainerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectMaintainer model
   */
  readonly fields: ProjectMaintainerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectMaintainer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectMaintainerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    maintainer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectMaintainer model
   */
  interface ProjectMaintainerFieldRefs {
    readonly id: FieldRef<"ProjectMaintainer", 'String'>
    readonly project_id: FieldRef<"ProjectMaintainer", 'String'>
    readonly maintainer_id: FieldRef<"ProjectMaintainer", 'String'>
    readonly is_owner: FieldRef<"ProjectMaintainer", 'Boolean'>
    readonly created_at: FieldRef<"ProjectMaintainer", 'DateTime'>
    readonly updated_at: FieldRef<"ProjectMaintainer", 'DateTime'>
    readonly is_active: FieldRef<"ProjectMaintainer", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProjectMaintainer findUnique
   */
  export type ProjectMaintainerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMaintainer to fetch.
     */
    where: ProjectMaintainerWhereUniqueInput
  }

  /**
   * ProjectMaintainer findUniqueOrThrow
   */
  export type ProjectMaintainerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMaintainer to fetch.
     */
    where: ProjectMaintainerWhereUniqueInput
  }

  /**
   * ProjectMaintainer findFirst
   */
  export type ProjectMaintainerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMaintainer to fetch.
     */
    where?: ProjectMaintainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMaintainers to fetch.
     */
    orderBy?: ProjectMaintainerOrderByWithRelationInput | ProjectMaintainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMaintainers.
     */
    cursor?: ProjectMaintainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMaintainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMaintainers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMaintainers.
     */
    distinct?: ProjectMaintainerScalarFieldEnum | ProjectMaintainerScalarFieldEnum[]
  }

  /**
   * ProjectMaintainer findFirstOrThrow
   */
  export type ProjectMaintainerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMaintainer to fetch.
     */
    where?: ProjectMaintainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMaintainers to fetch.
     */
    orderBy?: ProjectMaintainerOrderByWithRelationInput | ProjectMaintainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMaintainers.
     */
    cursor?: ProjectMaintainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMaintainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMaintainers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMaintainers.
     */
    distinct?: ProjectMaintainerScalarFieldEnum | ProjectMaintainerScalarFieldEnum[]
  }

  /**
   * ProjectMaintainer findMany
   */
  export type ProjectMaintainerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMaintainers to fetch.
     */
    where?: ProjectMaintainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMaintainers to fetch.
     */
    orderBy?: ProjectMaintainerOrderByWithRelationInput | ProjectMaintainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectMaintainers.
     */
    cursor?: ProjectMaintainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMaintainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMaintainers.
     */
    skip?: number
    distinct?: ProjectMaintainerScalarFieldEnum | ProjectMaintainerScalarFieldEnum[]
  }

  /**
   * ProjectMaintainer create
   */
  export type ProjectMaintainerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectMaintainer.
     */
    data: XOR<ProjectMaintainerCreateInput, ProjectMaintainerUncheckedCreateInput>
  }

  /**
   * ProjectMaintainer createMany
   */
  export type ProjectMaintainerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectMaintainers.
     */
    data: ProjectMaintainerCreateManyInput | ProjectMaintainerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectMaintainer createManyAndReturn
   */
  export type ProjectMaintainerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectMaintainers.
     */
    data: ProjectMaintainerCreateManyInput | ProjectMaintainerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMaintainer update
   */
  export type ProjectMaintainerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectMaintainer.
     */
    data: XOR<ProjectMaintainerUpdateInput, ProjectMaintainerUncheckedUpdateInput>
    /**
     * Choose, which ProjectMaintainer to update.
     */
    where: ProjectMaintainerWhereUniqueInput
  }

  /**
   * ProjectMaintainer updateMany
   */
  export type ProjectMaintainerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectMaintainers.
     */
    data: XOR<ProjectMaintainerUpdateManyMutationInput, ProjectMaintainerUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMaintainers to update
     */
    where?: ProjectMaintainerWhereInput
    /**
     * Limit how many ProjectMaintainers to update.
     */
    limit?: number
  }

  /**
   * ProjectMaintainer updateManyAndReturn
   */
  export type ProjectMaintainerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * The data used to update ProjectMaintainers.
     */
    data: XOR<ProjectMaintainerUpdateManyMutationInput, ProjectMaintainerUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMaintainers to update
     */
    where?: ProjectMaintainerWhereInput
    /**
     * Limit how many ProjectMaintainers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMaintainer upsert
   */
  export type ProjectMaintainerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectMaintainer to update in case it exists.
     */
    where: ProjectMaintainerWhereUniqueInput
    /**
     * In case the ProjectMaintainer found by the `where` argument doesn't exist, create a new ProjectMaintainer with this data.
     */
    create: XOR<ProjectMaintainerCreateInput, ProjectMaintainerUncheckedCreateInput>
    /**
     * In case the ProjectMaintainer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectMaintainerUpdateInput, ProjectMaintainerUncheckedUpdateInput>
  }

  /**
   * ProjectMaintainer delete
   */
  export type ProjectMaintainerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
    /**
     * Filter which ProjectMaintainer to delete.
     */
    where: ProjectMaintainerWhereUniqueInput
  }

  /**
   * ProjectMaintainer deleteMany
   */
  export type ProjectMaintainerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMaintainers to delete
     */
    where?: ProjectMaintainerWhereInput
    /**
     * Limit how many ProjectMaintainers to delete.
     */
    limit?: number
  }

  /**
   * ProjectMaintainer without action
   */
  export type ProjectMaintainerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMaintainer
     */
    select?: ProjectMaintainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMaintainer
     */
    omit?: ProjectMaintainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMaintainerInclude<ExtArgs> | null
  }


  /**
   * Model ProjectReview
   */

  export type AggregateProjectReview = {
    _count: ProjectReviewCountAggregateOutputType | null
    _min: ProjectReviewMinAggregateOutputType | null
    _max: ProjectReviewMaxAggregateOutputType | null
  }

  export type ProjectReviewMinAggregateOutputType = {
    review_id: string | null
    project_id: string | null
    admin_id: string | null
    action: $Enums.ReviewAction | null
    reason: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectReviewMaxAggregateOutputType = {
    review_id: string | null
    project_id: string | null
    admin_id: string | null
    action: $Enums.ReviewAction | null
    reason: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectReviewCountAggregateOutputType = {
    review_id: number
    project_id: number
    admin_id: number
    action: number
    reason: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProjectReviewMinAggregateInputType = {
    review_id?: true
    project_id?: true
    admin_id?: true
    action?: true
    reason?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectReviewMaxAggregateInputType = {
    review_id?: true
    project_id?: true
    admin_id?: true
    action?: true
    reason?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectReviewCountAggregateInputType = {
    review_id?: true
    project_id?: true
    admin_id?: true
    action?: true
    reason?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProjectReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectReview to aggregate.
     */
    where?: ProjectReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectReviews to fetch.
     */
    orderBy?: ProjectReviewOrderByWithRelationInput | ProjectReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectReviews
    **/
    _count?: true | ProjectReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectReviewMaxAggregateInputType
  }

  export type GetProjectReviewAggregateType<T extends ProjectReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectReview[P]>
      : GetScalarType<T[P], AggregateProjectReview[P]>
  }




  export type ProjectReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectReviewWhereInput
    orderBy?: ProjectReviewOrderByWithAggregationInput | ProjectReviewOrderByWithAggregationInput[]
    by: ProjectReviewScalarFieldEnum[] | ProjectReviewScalarFieldEnum
    having?: ProjectReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectReviewCountAggregateInputType | true
    _min?: ProjectReviewMinAggregateInputType
    _max?: ProjectReviewMaxAggregateInputType
  }

  export type ProjectReviewGroupByOutputType = {
    review_id: string
    project_id: string
    admin_id: string
    action: $Enums.ReviewAction
    reason: string | null
    created_at: Date
    updated_at: Date
    _count: ProjectReviewCountAggregateOutputType | null
    _min: ProjectReviewMinAggregateOutputType | null
    _max: ProjectReviewMaxAggregateOutputType | null
  }

  type GetProjectReviewGroupByPayload<T extends ProjectReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectReviewGroupByOutputType[P]>
        }
      >
    >


  export type ProjectReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    review_id?: boolean
    project_id?: boolean
    admin_id?: boolean
    action?: boolean
    reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectReview"]>

  export type ProjectReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    review_id?: boolean
    project_id?: boolean
    admin_id?: boolean
    action?: boolean
    reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectReview"]>

  export type ProjectReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    review_id?: boolean
    project_id?: boolean
    admin_id?: boolean
    action?: boolean
    reason?: boolean
    created_at?: boolean
    updated_at?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectReview"]>

  export type ProjectReviewSelectScalar = {
    review_id?: boolean
    project_id?: boolean
    admin_id?: boolean
    action?: boolean
    reason?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProjectReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"review_id" | "project_id" | "admin_id" | "action" | "reason" | "created_at" | "updated_at", ExtArgs["result"]["projectReview"]>
  export type ProjectReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectReview"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      admin: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      review_id: string
      project_id: string
      admin_id: string
      action: $Enums.ReviewAction
      reason: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["projectReview"]>
    composites: {}
  }

  type ProjectReviewGetPayload<S extends boolean | null | undefined | ProjectReviewDefaultArgs> = $Result.GetResult<Prisma.$ProjectReviewPayload, S>

  type ProjectReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectReviewCountAggregateInputType | true
    }

  export interface ProjectReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectReview'], meta: { name: 'ProjectReview' } }
    /**
     * Find zero or one ProjectReview that matches the filter.
     * @param {ProjectReviewFindUniqueArgs} args - Arguments to find a ProjectReview
     * @example
     * // Get one ProjectReview
     * const projectReview = await prisma.projectReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectReviewFindUniqueArgs>(args: SelectSubset<T, ProjectReviewFindUniqueArgs<ExtArgs>>): Prisma__ProjectReviewClient<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectReviewFindUniqueOrThrowArgs} args - Arguments to find a ProjectReview
     * @example
     * // Get one ProjectReview
     * const projectReview = await prisma.projectReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectReviewClient<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectReviewFindFirstArgs} args - Arguments to find a ProjectReview
     * @example
     * // Get one ProjectReview
     * const projectReview = await prisma.projectReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectReviewFindFirstArgs>(args?: SelectSubset<T, ProjectReviewFindFirstArgs<ExtArgs>>): Prisma__ProjectReviewClient<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectReviewFindFirstOrThrowArgs} args - Arguments to find a ProjectReview
     * @example
     * // Get one ProjectReview
     * const projectReview = await prisma.projectReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectReviewClient<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectReviews
     * const projectReviews = await prisma.projectReview.findMany()
     * 
     * // Get first 10 ProjectReviews
     * const projectReviews = await prisma.projectReview.findMany({ take: 10 })
     * 
     * // Only select the `review_id`
     * const projectReviewWithReview_idOnly = await prisma.projectReview.findMany({ select: { review_id: true } })
     * 
     */
    findMany<T extends ProjectReviewFindManyArgs>(args?: SelectSubset<T, ProjectReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectReview.
     * @param {ProjectReviewCreateArgs} args - Arguments to create a ProjectReview.
     * @example
     * // Create one ProjectReview
     * const ProjectReview = await prisma.projectReview.create({
     *   data: {
     *     // ... data to create a ProjectReview
     *   }
     * })
     * 
     */
    create<T extends ProjectReviewCreateArgs>(args: SelectSubset<T, ProjectReviewCreateArgs<ExtArgs>>): Prisma__ProjectReviewClient<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectReviews.
     * @param {ProjectReviewCreateManyArgs} args - Arguments to create many ProjectReviews.
     * @example
     * // Create many ProjectReviews
     * const projectReview = await prisma.projectReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectReviewCreateManyArgs>(args?: SelectSubset<T, ProjectReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectReviews and returns the data saved in the database.
     * @param {ProjectReviewCreateManyAndReturnArgs} args - Arguments to create many ProjectReviews.
     * @example
     * // Create many ProjectReviews
     * const projectReview = await prisma.projectReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectReviews and only return the `review_id`
     * const projectReviewWithReview_idOnly = await prisma.projectReview.createManyAndReturn({
     *   select: { review_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectReview.
     * @param {ProjectReviewDeleteArgs} args - Arguments to delete one ProjectReview.
     * @example
     * // Delete one ProjectReview
     * const ProjectReview = await prisma.projectReview.delete({
     *   where: {
     *     // ... filter to delete one ProjectReview
     *   }
     * })
     * 
     */
    delete<T extends ProjectReviewDeleteArgs>(args: SelectSubset<T, ProjectReviewDeleteArgs<ExtArgs>>): Prisma__ProjectReviewClient<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectReview.
     * @param {ProjectReviewUpdateArgs} args - Arguments to update one ProjectReview.
     * @example
     * // Update one ProjectReview
     * const projectReview = await prisma.projectReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectReviewUpdateArgs>(args: SelectSubset<T, ProjectReviewUpdateArgs<ExtArgs>>): Prisma__ProjectReviewClient<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectReviews.
     * @param {ProjectReviewDeleteManyArgs} args - Arguments to filter ProjectReviews to delete.
     * @example
     * // Delete a few ProjectReviews
     * const { count } = await prisma.projectReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectReviewDeleteManyArgs>(args?: SelectSubset<T, ProjectReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectReviews
     * const projectReview = await prisma.projectReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectReviewUpdateManyArgs>(args: SelectSubset<T, ProjectReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectReviews and returns the data updated in the database.
     * @param {ProjectReviewUpdateManyAndReturnArgs} args - Arguments to update many ProjectReviews.
     * @example
     * // Update many ProjectReviews
     * const projectReview = await prisma.projectReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectReviews and only return the `review_id`
     * const projectReviewWithReview_idOnly = await prisma.projectReview.updateManyAndReturn({
     *   select: { review_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectReview.
     * @param {ProjectReviewUpsertArgs} args - Arguments to update or create a ProjectReview.
     * @example
     * // Update or create a ProjectReview
     * const projectReview = await prisma.projectReview.upsert({
     *   create: {
     *     // ... data to create a ProjectReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectReview we want to update
     *   }
     * })
     */
    upsert<T extends ProjectReviewUpsertArgs>(args: SelectSubset<T, ProjectReviewUpsertArgs<ExtArgs>>): Prisma__ProjectReviewClient<$Result.GetResult<Prisma.$ProjectReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectReviewCountArgs} args - Arguments to filter ProjectReviews to count.
     * @example
     * // Count the number of ProjectReviews
     * const count = await prisma.projectReview.count({
     *   where: {
     *     // ... the filter for the ProjectReviews we want to count
     *   }
     * })
    **/
    count<T extends ProjectReviewCountArgs>(
      args?: Subset<T, ProjectReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectReviewAggregateArgs>(args: Subset<T, ProjectReviewAggregateArgs>): Prisma.PrismaPromise<GetProjectReviewAggregateType<T>>

    /**
     * Group by ProjectReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectReviewGroupByArgs['orderBy'] }
        : { orderBy?: ProjectReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectReview model
   */
  readonly fields: ProjectReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectReview model
   */
  interface ProjectReviewFieldRefs {
    readonly review_id: FieldRef<"ProjectReview", 'String'>
    readonly project_id: FieldRef<"ProjectReview", 'String'>
    readonly admin_id: FieldRef<"ProjectReview", 'String'>
    readonly action: FieldRef<"ProjectReview", 'ReviewAction'>
    readonly reason: FieldRef<"ProjectReview", 'String'>
    readonly created_at: FieldRef<"ProjectReview", 'DateTime'>
    readonly updated_at: FieldRef<"ProjectReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectReview findUnique
   */
  export type ProjectReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProjectReview to fetch.
     */
    where: ProjectReviewWhereUniqueInput
  }

  /**
   * ProjectReview findUniqueOrThrow
   */
  export type ProjectReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProjectReview to fetch.
     */
    where: ProjectReviewWhereUniqueInput
  }

  /**
   * ProjectReview findFirst
   */
  export type ProjectReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProjectReview to fetch.
     */
    where?: ProjectReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectReviews to fetch.
     */
    orderBy?: ProjectReviewOrderByWithRelationInput | ProjectReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectReviews.
     */
    cursor?: ProjectReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectReviews.
     */
    distinct?: ProjectReviewScalarFieldEnum | ProjectReviewScalarFieldEnum[]
  }

  /**
   * ProjectReview findFirstOrThrow
   */
  export type ProjectReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProjectReview to fetch.
     */
    where?: ProjectReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectReviews to fetch.
     */
    orderBy?: ProjectReviewOrderByWithRelationInput | ProjectReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectReviews.
     */
    cursor?: ProjectReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectReviews.
     */
    distinct?: ProjectReviewScalarFieldEnum | ProjectReviewScalarFieldEnum[]
  }

  /**
   * ProjectReview findMany
   */
  export type ProjectReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProjectReviews to fetch.
     */
    where?: ProjectReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectReviews to fetch.
     */
    orderBy?: ProjectReviewOrderByWithRelationInput | ProjectReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectReviews.
     */
    cursor?: ProjectReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectReviews.
     */
    skip?: number
    distinct?: ProjectReviewScalarFieldEnum | ProjectReviewScalarFieldEnum[]
  }

  /**
   * ProjectReview create
   */
  export type ProjectReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectReview.
     */
    data: XOR<ProjectReviewCreateInput, ProjectReviewUncheckedCreateInput>
  }

  /**
   * ProjectReview createMany
   */
  export type ProjectReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectReviews.
     */
    data: ProjectReviewCreateManyInput | ProjectReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectReview createManyAndReturn
   */
  export type ProjectReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectReviews.
     */
    data: ProjectReviewCreateManyInput | ProjectReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectReview update
   */
  export type ProjectReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectReview.
     */
    data: XOR<ProjectReviewUpdateInput, ProjectReviewUncheckedUpdateInput>
    /**
     * Choose, which ProjectReview to update.
     */
    where: ProjectReviewWhereUniqueInput
  }

  /**
   * ProjectReview updateMany
   */
  export type ProjectReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectReviews.
     */
    data: XOR<ProjectReviewUpdateManyMutationInput, ProjectReviewUncheckedUpdateManyInput>
    /**
     * Filter which ProjectReviews to update
     */
    where?: ProjectReviewWhereInput
    /**
     * Limit how many ProjectReviews to update.
     */
    limit?: number
  }

  /**
   * ProjectReview updateManyAndReturn
   */
  export type ProjectReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * The data used to update ProjectReviews.
     */
    data: XOR<ProjectReviewUpdateManyMutationInput, ProjectReviewUncheckedUpdateManyInput>
    /**
     * Filter which ProjectReviews to update
     */
    where?: ProjectReviewWhereInput
    /**
     * Limit how many ProjectReviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectReview upsert
   */
  export type ProjectReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectReview to update in case it exists.
     */
    where: ProjectReviewWhereUniqueInput
    /**
     * In case the ProjectReview found by the `where` argument doesn't exist, create a new ProjectReview with this data.
     */
    create: XOR<ProjectReviewCreateInput, ProjectReviewUncheckedCreateInput>
    /**
     * In case the ProjectReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectReviewUpdateInput, ProjectReviewUncheckedUpdateInput>
  }

  /**
   * ProjectReview delete
   */
  export type ProjectReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
    /**
     * Filter which ProjectReview to delete.
     */
    where: ProjectReviewWhereUniqueInput
  }

  /**
   * ProjectReview deleteMany
   */
  export type ProjectReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectReviews to delete
     */
    where?: ProjectReviewWhereInput
    /**
     * Limit how many ProjectReviews to delete.
     */
    limit?: number
  }

  /**
   * ProjectReview without action
   */
  export type ProjectReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectReview
     */
    select?: ProjectReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectReview
     */
    omit?: ProjectReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectReviewInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    email: 'email',
    username: 'username',
    avatar_url: 'avatar_url',
    roles: 'roles',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_active: 'is_active'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MaintainerProfileScalarFieldEnum: {
    user_id: 'user_id',
    bio: 'bio',
    social_media: 'social_media',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MaintainerProfileScalarFieldEnum = (typeof MaintainerProfileScalarFieldEnum)[keyof typeof MaintainerProfileScalarFieldEnum]


  export const ContributorProfileScalarFieldEnum: {
    user_id: 'user_id',
    skills: 'skills',
    bio: 'bio',
    portfolio_url: 'portfolio_url',
    social_media: 'social_media',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ContributorProfileScalarFieldEnum = (typeof ContributorProfileScalarFieldEnum)[keyof typeof ContributorProfileScalarFieldEnum]


  export const AdminProfileScalarFieldEnum: {
    user_id: 'user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AdminProfileScalarFieldEnum = (typeof AdminProfileScalarFieldEnum)[keyof typeof AdminProfileScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    wallet_id: 'wallet_id',
    user_id: 'user_id',
    address: 'address',
    is_primary: 'is_primary',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    project_id: 'project_id',
    name: 'name',
    github_handle: 'github_handle',
    short_description: 'short_description',
    description: 'description',
    tech_stack: 'tech_stack',
    category: 'category',
    status: 'status',
    created_by: 'created_by',
    created_at: 'created_at',
    updated_at: 'updated_at',
    reviewed_at: 'reviewed_at'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const RepositoryScalarFieldEnum: {
    github_repo_id: 'github_repo_id',
    project_id: 'project_id',
    github_url: 'github_url',
    name: 'name',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type RepositoryScalarFieldEnum = (typeof RepositoryScalarFieldEnum)[keyof typeof RepositoryScalarFieldEnum]


  export const ProjectMaintainerScalarFieldEnum: {
    id: 'id',
    project_id: 'project_id',
    maintainer_id: 'maintainer_id',
    is_owner: 'is_owner',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_active: 'is_active'
  };

  export type ProjectMaintainerScalarFieldEnum = (typeof ProjectMaintainerScalarFieldEnum)[keyof typeof ProjectMaintainerScalarFieldEnum]


  export const ProjectReviewScalarFieldEnum: {
    review_id: 'review_id',
    project_id: 'project_id',
    admin_id: 'admin_id',
    action: 'action',
    reason: 'reason',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProjectReviewScalarFieldEnum = (typeof ProjectReviewScalarFieldEnum)[keyof typeof ProjectReviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'ProjectCategory'
   */
  export type EnumProjectCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectCategory'>
    


  /**
   * Reference to a field of type 'ProjectCategory[]'
   */
  export type ListEnumProjectCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectCategory[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'ReviewAction'
   */
  export type EnumReviewActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewAction'>
    


  /**
   * Reference to a field of type 'ReviewAction[]'
   */
  export type ListEnumReviewActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewAction[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    avatar_url?: StringNullableFilter<"User"> | string | null
    roles?: EnumUserRoleNullableListFilter<"User">
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    is_active?: BoolFilter<"User"> | boolean
    maintainer_profile?: XOR<MaintainerProfileNullableScalarRelationFilter, MaintainerProfileWhereInput> | null
    contributor_profile?: XOR<ContributorProfileNullableScalarRelationFilter, ContributorProfileWhereInput> | null
    admin_profile?: XOR<AdminProfileNullableScalarRelationFilter, AdminProfileWhereInput> | null
    project_maintainers?: ProjectMaintainerListRelationFilter
    project_reviews?: ProjectReviewListRelationFilter
    wallets?: WalletListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    email?: SortOrder
    username?: SortOrderInput | SortOrder
    avatar_url?: SortOrderInput | SortOrder
    roles?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
    maintainer_profile?: MaintainerProfileOrderByWithRelationInput
    contributor_profile?: ContributorProfileOrderByWithRelationInput
    admin_profile?: AdminProfileOrderByWithRelationInput
    project_maintainers?: ProjectMaintainerOrderByRelationAggregateInput
    project_reviews?: ProjectReviewOrderByRelationAggregateInput
    wallets?: WalletOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    avatar_url?: StringNullableFilter<"User"> | string | null
    roles?: EnumUserRoleNullableListFilter<"User">
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    is_active?: BoolFilter<"User"> | boolean
    maintainer_profile?: XOR<MaintainerProfileNullableScalarRelationFilter, MaintainerProfileWhereInput> | null
    contributor_profile?: XOR<ContributorProfileNullableScalarRelationFilter, ContributorProfileWhereInput> | null
    admin_profile?: XOR<AdminProfileNullableScalarRelationFilter, AdminProfileWhereInput> | null
    project_maintainers?: ProjectMaintainerListRelationFilter
    project_reviews?: ProjectReviewListRelationFilter
    wallets?: WalletListRelationFilter
  }, "user_id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    email?: SortOrder
    username?: SortOrderInput | SortOrder
    avatar_url?: SortOrderInput | SortOrder
    roles?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    user_id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar_url?: StringNullableWithAggregatesFilter<"User"> | string | null
    roles?: EnumUserRoleNullableListFilter<"User">
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    is_active?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type MaintainerProfileWhereInput = {
    AND?: MaintainerProfileWhereInput | MaintainerProfileWhereInput[]
    OR?: MaintainerProfileWhereInput[]
    NOT?: MaintainerProfileWhereInput | MaintainerProfileWhereInput[]
    user_id?: UuidFilter<"MaintainerProfile"> | string
    bio?: StringNullableFilter<"MaintainerProfile"> | string | null
    social_media?: JsonNullableFilter<"MaintainerProfile">
    created_at?: DateTimeFilter<"MaintainerProfile"> | Date | string
    updated_at?: DateTimeFilter<"MaintainerProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MaintainerProfileOrderByWithRelationInput = {
    user_id?: SortOrder
    bio?: SortOrderInput | SortOrder
    social_media?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MaintainerProfileWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    AND?: MaintainerProfileWhereInput | MaintainerProfileWhereInput[]
    OR?: MaintainerProfileWhereInput[]
    NOT?: MaintainerProfileWhereInput | MaintainerProfileWhereInput[]
    bio?: StringNullableFilter<"MaintainerProfile"> | string | null
    social_media?: JsonNullableFilter<"MaintainerProfile">
    created_at?: DateTimeFilter<"MaintainerProfile"> | Date | string
    updated_at?: DateTimeFilter<"MaintainerProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "user_id">

  export type MaintainerProfileOrderByWithAggregationInput = {
    user_id?: SortOrder
    bio?: SortOrderInput | SortOrder
    social_media?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: MaintainerProfileCountOrderByAggregateInput
    _max?: MaintainerProfileMaxOrderByAggregateInput
    _min?: MaintainerProfileMinOrderByAggregateInput
  }

  export type MaintainerProfileScalarWhereWithAggregatesInput = {
    AND?: MaintainerProfileScalarWhereWithAggregatesInput | MaintainerProfileScalarWhereWithAggregatesInput[]
    OR?: MaintainerProfileScalarWhereWithAggregatesInput[]
    NOT?: MaintainerProfileScalarWhereWithAggregatesInput | MaintainerProfileScalarWhereWithAggregatesInput[]
    user_id?: UuidWithAggregatesFilter<"MaintainerProfile"> | string
    bio?: StringNullableWithAggregatesFilter<"MaintainerProfile"> | string | null
    social_media?: JsonNullableWithAggregatesFilter<"MaintainerProfile">
    created_at?: DateTimeWithAggregatesFilter<"MaintainerProfile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"MaintainerProfile"> | Date | string
  }

  export type ContributorProfileWhereInput = {
    AND?: ContributorProfileWhereInput | ContributorProfileWhereInput[]
    OR?: ContributorProfileWhereInput[]
    NOT?: ContributorProfileWhereInput | ContributorProfileWhereInput[]
    user_id?: UuidFilter<"ContributorProfile"> | string
    skills?: StringNullableListFilter<"ContributorProfile">
    bio?: StringNullableFilter<"ContributorProfile"> | string | null
    portfolio_url?: StringNullableFilter<"ContributorProfile"> | string | null
    social_media?: JsonNullableFilter<"ContributorProfile">
    created_at?: DateTimeFilter<"ContributorProfile"> | Date | string
    updated_at?: DateTimeFilter<"ContributorProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ContributorProfileOrderByWithRelationInput = {
    user_id?: SortOrder
    skills?: SortOrder
    bio?: SortOrderInput | SortOrder
    portfolio_url?: SortOrderInput | SortOrder
    social_media?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ContributorProfileWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    AND?: ContributorProfileWhereInput | ContributorProfileWhereInput[]
    OR?: ContributorProfileWhereInput[]
    NOT?: ContributorProfileWhereInput | ContributorProfileWhereInput[]
    skills?: StringNullableListFilter<"ContributorProfile">
    bio?: StringNullableFilter<"ContributorProfile"> | string | null
    portfolio_url?: StringNullableFilter<"ContributorProfile"> | string | null
    social_media?: JsonNullableFilter<"ContributorProfile">
    created_at?: DateTimeFilter<"ContributorProfile"> | Date | string
    updated_at?: DateTimeFilter<"ContributorProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "user_id">

  export type ContributorProfileOrderByWithAggregationInput = {
    user_id?: SortOrder
    skills?: SortOrder
    bio?: SortOrderInput | SortOrder
    portfolio_url?: SortOrderInput | SortOrder
    social_media?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ContributorProfileCountOrderByAggregateInput
    _max?: ContributorProfileMaxOrderByAggregateInput
    _min?: ContributorProfileMinOrderByAggregateInput
  }

  export type ContributorProfileScalarWhereWithAggregatesInput = {
    AND?: ContributorProfileScalarWhereWithAggregatesInput | ContributorProfileScalarWhereWithAggregatesInput[]
    OR?: ContributorProfileScalarWhereWithAggregatesInput[]
    NOT?: ContributorProfileScalarWhereWithAggregatesInput | ContributorProfileScalarWhereWithAggregatesInput[]
    user_id?: UuidWithAggregatesFilter<"ContributorProfile"> | string
    skills?: StringNullableListFilter<"ContributorProfile">
    bio?: StringNullableWithAggregatesFilter<"ContributorProfile"> | string | null
    portfolio_url?: StringNullableWithAggregatesFilter<"ContributorProfile"> | string | null
    social_media?: JsonNullableWithAggregatesFilter<"ContributorProfile">
    created_at?: DateTimeWithAggregatesFilter<"ContributorProfile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ContributorProfile"> | Date | string
  }

  export type AdminProfileWhereInput = {
    AND?: AdminProfileWhereInput | AdminProfileWhereInput[]
    OR?: AdminProfileWhereInput[]
    NOT?: AdminProfileWhereInput | AdminProfileWhereInput[]
    user_id?: UuidFilter<"AdminProfile"> | string
    created_at?: DateTimeFilter<"AdminProfile"> | Date | string
    updated_at?: DateTimeFilter<"AdminProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AdminProfileOrderByWithRelationInput = {
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdminProfileWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    AND?: AdminProfileWhereInput | AdminProfileWhereInput[]
    OR?: AdminProfileWhereInput[]
    NOT?: AdminProfileWhereInput | AdminProfileWhereInput[]
    created_at?: DateTimeFilter<"AdminProfile"> | Date | string
    updated_at?: DateTimeFilter<"AdminProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "user_id">

  export type AdminProfileOrderByWithAggregationInput = {
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AdminProfileCountOrderByAggregateInput
    _max?: AdminProfileMaxOrderByAggregateInput
    _min?: AdminProfileMinOrderByAggregateInput
  }

  export type AdminProfileScalarWhereWithAggregatesInput = {
    AND?: AdminProfileScalarWhereWithAggregatesInput | AdminProfileScalarWhereWithAggregatesInput[]
    OR?: AdminProfileScalarWhereWithAggregatesInput[]
    NOT?: AdminProfileScalarWhereWithAggregatesInput | AdminProfileScalarWhereWithAggregatesInput[]
    user_id?: UuidWithAggregatesFilter<"AdminProfile"> | string
    created_at?: DateTimeWithAggregatesFilter<"AdminProfile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AdminProfile"> | Date | string
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    wallet_id?: UuidFilter<"Wallet"> | string
    user_id?: UuidFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    is_primary?: BoolFilter<"Wallet"> | boolean
    created_at?: DateTimeFilter<"Wallet"> | Date | string
    updated_at?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WalletOrderByWithRelationInput = {
    wallet_id?: SortOrder
    user_id?: SortOrder
    address?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    wallet_id?: string
    address?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    user_id?: UuidFilter<"Wallet"> | string
    is_primary?: BoolFilter<"Wallet"> | boolean
    created_at?: DateTimeFilter<"Wallet"> | Date | string
    updated_at?: DateTimeFilter<"Wallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "wallet_id" | "address">

  export type WalletOrderByWithAggregationInput = {
    wallet_id?: SortOrder
    user_id?: SortOrder
    address?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    wallet_id?: UuidWithAggregatesFilter<"Wallet"> | string
    user_id?: UuidWithAggregatesFilter<"Wallet"> | string
    address?: StringWithAggregatesFilter<"Wallet"> | string
    is_primary?: BoolWithAggregatesFilter<"Wallet"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    project_id?: UuidFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    github_handle?: StringFilter<"Project"> | string
    short_description?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    tech_stack?: StringNullableListFilter<"Project">
    category?: EnumProjectCategoryFilter<"Project"> | $Enums.ProjectCategory
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    created_by?: UuidFilter<"Project"> | string
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    reviewed_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    repositories?: RepositoryListRelationFilter
    maintainers?: ProjectMaintainerListRelationFilter
    reviews?: ProjectReviewListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    project_id?: SortOrder
    name?: SortOrder
    github_handle?: SortOrder
    short_description?: SortOrder
    description?: SortOrder
    tech_stack?: SortOrder
    category?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reviewed_at?: SortOrderInput | SortOrder
    repositories?: RepositoryOrderByRelationAggregateInput
    maintainers?: ProjectMaintainerOrderByRelationAggregateInput
    reviews?: ProjectReviewOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    project_id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    github_handle?: StringFilter<"Project"> | string
    short_description?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    tech_stack?: StringNullableListFilter<"Project">
    category?: EnumProjectCategoryFilter<"Project"> | $Enums.ProjectCategory
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    created_by?: UuidFilter<"Project"> | string
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    reviewed_at?: DateTimeNullableFilter<"Project"> | Date | string | null
    repositories?: RepositoryListRelationFilter
    maintainers?: ProjectMaintainerListRelationFilter
    reviews?: ProjectReviewListRelationFilter
  }, "project_id">

  export type ProjectOrderByWithAggregationInput = {
    project_id?: SortOrder
    name?: SortOrder
    github_handle?: SortOrder
    short_description?: SortOrder
    description?: SortOrder
    tech_stack?: SortOrder
    category?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reviewed_at?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    project_id?: UuidWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    github_handle?: StringWithAggregatesFilter<"Project"> | string
    short_description?: StringWithAggregatesFilter<"Project"> | string
    description?: StringWithAggregatesFilter<"Project"> | string
    tech_stack?: StringNullableListFilter<"Project">
    category?: EnumProjectCategoryWithAggregatesFilter<"Project"> | $Enums.ProjectCategory
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    created_by?: UuidWithAggregatesFilter<"Project"> | string
    created_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    reviewed_at?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
  }

  export type RepositoryWhereInput = {
    AND?: RepositoryWhereInput | RepositoryWhereInput[]
    OR?: RepositoryWhereInput[]
    NOT?: RepositoryWhereInput | RepositoryWhereInput[]
    github_repo_id?: BigIntFilter<"Repository"> | bigint | number
    project_id?: UuidFilter<"Repository"> | string
    github_url?: StringFilter<"Repository"> | string
    name?: StringFilter<"Repository"> | string
    description?: StringNullableFilter<"Repository"> | string | null
    created_at?: DateTimeFilter<"Repository"> | Date | string
    updated_at?: DateTimeFilter<"Repository"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type RepositoryOrderByWithRelationInput = {
    github_repo_id?: SortOrder
    project_id?: SortOrder
    github_url?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type RepositoryWhereUniqueInput = Prisma.AtLeast<{
    github_repo_id?: bigint | number
    AND?: RepositoryWhereInput | RepositoryWhereInput[]
    OR?: RepositoryWhereInput[]
    NOT?: RepositoryWhereInput | RepositoryWhereInput[]
    project_id?: UuidFilter<"Repository"> | string
    github_url?: StringFilter<"Repository"> | string
    name?: StringFilter<"Repository"> | string
    description?: StringNullableFilter<"Repository"> | string | null
    created_at?: DateTimeFilter<"Repository"> | Date | string
    updated_at?: DateTimeFilter<"Repository"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "github_repo_id">

  export type RepositoryOrderByWithAggregationInput = {
    github_repo_id?: SortOrder
    project_id?: SortOrder
    github_url?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: RepositoryCountOrderByAggregateInput
    _avg?: RepositoryAvgOrderByAggregateInput
    _max?: RepositoryMaxOrderByAggregateInput
    _min?: RepositoryMinOrderByAggregateInput
    _sum?: RepositorySumOrderByAggregateInput
  }

  export type RepositoryScalarWhereWithAggregatesInput = {
    AND?: RepositoryScalarWhereWithAggregatesInput | RepositoryScalarWhereWithAggregatesInput[]
    OR?: RepositoryScalarWhereWithAggregatesInput[]
    NOT?: RepositoryScalarWhereWithAggregatesInput | RepositoryScalarWhereWithAggregatesInput[]
    github_repo_id?: BigIntWithAggregatesFilter<"Repository"> | bigint | number
    project_id?: UuidWithAggregatesFilter<"Repository"> | string
    github_url?: StringWithAggregatesFilter<"Repository"> | string
    name?: StringWithAggregatesFilter<"Repository"> | string
    description?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Repository"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Repository"> | Date | string
  }

  export type ProjectMaintainerWhereInput = {
    AND?: ProjectMaintainerWhereInput | ProjectMaintainerWhereInput[]
    OR?: ProjectMaintainerWhereInput[]
    NOT?: ProjectMaintainerWhereInput | ProjectMaintainerWhereInput[]
    id?: UuidFilter<"ProjectMaintainer"> | string
    project_id?: UuidFilter<"ProjectMaintainer"> | string
    maintainer_id?: UuidFilter<"ProjectMaintainer"> | string
    is_owner?: BoolFilter<"ProjectMaintainer"> | boolean
    created_at?: DateTimeFilter<"ProjectMaintainer"> | Date | string
    updated_at?: DateTimeFilter<"ProjectMaintainer"> | Date | string
    is_active?: BoolFilter<"ProjectMaintainer"> | boolean
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    maintainer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProjectMaintainerOrderByWithRelationInput = {
    id?: SortOrder
    project_id?: SortOrder
    maintainer_id?: SortOrder
    is_owner?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
    project?: ProjectOrderByWithRelationInput
    maintainer?: UserOrderByWithRelationInput
  }

  export type ProjectMaintainerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    project_id_maintainer_id?: ProjectMaintainerProject_idMaintainer_idCompoundUniqueInput
    AND?: ProjectMaintainerWhereInput | ProjectMaintainerWhereInput[]
    OR?: ProjectMaintainerWhereInput[]
    NOT?: ProjectMaintainerWhereInput | ProjectMaintainerWhereInput[]
    project_id?: UuidFilter<"ProjectMaintainer"> | string
    maintainer_id?: UuidFilter<"ProjectMaintainer"> | string
    is_owner?: BoolFilter<"ProjectMaintainer"> | boolean
    created_at?: DateTimeFilter<"ProjectMaintainer"> | Date | string
    updated_at?: DateTimeFilter<"ProjectMaintainer"> | Date | string
    is_active?: BoolFilter<"ProjectMaintainer"> | boolean
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    maintainer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "project_id_maintainer_id">

  export type ProjectMaintainerOrderByWithAggregationInput = {
    id?: SortOrder
    project_id?: SortOrder
    maintainer_id?: SortOrder
    is_owner?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
    _count?: ProjectMaintainerCountOrderByAggregateInput
    _max?: ProjectMaintainerMaxOrderByAggregateInput
    _min?: ProjectMaintainerMinOrderByAggregateInput
  }

  export type ProjectMaintainerScalarWhereWithAggregatesInput = {
    AND?: ProjectMaintainerScalarWhereWithAggregatesInput | ProjectMaintainerScalarWhereWithAggregatesInput[]
    OR?: ProjectMaintainerScalarWhereWithAggregatesInput[]
    NOT?: ProjectMaintainerScalarWhereWithAggregatesInput | ProjectMaintainerScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ProjectMaintainer"> | string
    project_id?: UuidWithAggregatesFilter<"ProjectMaintainer"> | string
    maintainer_id?: UuidWithAggregatesFilter<"ProjectMaintainer"> | string
    is_owner?: BoolWithAggregatesFilter<"ProjectMaintainer"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"ProjectMaintainer"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ProjectMaintainer"> | Date | string
    is_active?: BoolWithAggregatesFilter<"ProjectMaintainer"> | boolean
  }

  export type ProjectReviewWhereInput = {
    AND?: ProjectReviewWhereInput | ProjectReviewWhereInput[]
    OR?: ProjectReviewWhereInput[]
    NOT?: ProjectReviewWhereInput | ProjectReviewWhereInput[]
    review_id?: UuidFilter<"ProjectReview"> | string
    project_id?: UuidFilter<"ProjectReview"> | string
    admin_id?: UuidFilter<"ProjectReview"> | string
    action?: EnumReviewActionFilter<"ProjectReview"> | $Enums.ReviewAction
    reason?: StringNullableFilter<"ProjectReview"> | string | null
    created_at?: DateTimeFilter<"ProjectReview"> | Date | string
    updated_at?: DateTimeFilter<"ProjectReview"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProjectReviewOrderByWithRelationInput = {
    review_id?: SortOrder
    project_id?: SortOrder
    admin_id?: SortOrder
    action?: SortOrder
    reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    project?: ProjectOrderByWithRelationInput
    admin?: UserOrderByWithRelationInput
  }

  export type ProjectReviewWhereUniqueInput = Prisma.AtLeast<{
    review_id?: string
    AND?: ProjectReviewWhereInput | ProjectReviewWhereInput[]
    OR?: ProjectReviewWhereInput[]
    NOT?: ProjectReviewWhereInput | ProjectReviewWhereInput[]
    project_id?: UuidFilter<"ProjectReview"> | string
    admin_id?: UuidFilter<"ProjectReview"> | string
    action?: EnumReviewActionFilter<"ProjectReview"> | $Enums.ReviewAction
    reason?: StringNullableFilter<"ProjectReview"> | string | null
    created_at?: DateTimeFilter<"ProjectReview"> | Date | string
    updated_at?: DateTimeFilter<"ProjectReview"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "review_id">

  export type ProjectReviewOrderByWithAggregationInput = {
    review_id?: SortOrder
    project_id?: SortOrder
    admin_id?: SortOrder
    action?: SortOrder
    reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProjectReviewCountOrderByAggregateInput
    _max?: ProjectReviewMaxOrderByAggregateInput
    _min?: ProjectReviewMinOrderByAggregateInput
  }

  export type ProjectReviewScalarWhereWithAggregatesInput = {
    AND?: ProjectReviewScalarWhereWithAggregatesInput | ProjectReviewScalarWhereWithAggregatesInput[]
    OR?: ProjectReviewScalarWhereWithAggregatesInput[]
    NOT?: ProjectReviewScalarWhereWithAggregatesInput | ProjectReviewScalarWhereWithAggregatesInput[]
    review_id?: UuidWithAggregatesFilter<"ProjectReview"> | string
    project_id?: UuidWithAggregatesFilter<"ProjectReview"> | string
    admin_id?: UuidWithAggregatesFilter<"ProjectReview"> | string
    action?: EnumReviewActionWithAggregatesFilter<"ProjectReview"> | $Enums.ReviewAction
    reason?: StringNullableWithAggregatesFilter<"ProjectReview"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ProjectReview"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ProjectReview"> | Date | string
  }

  export type UserCreateInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewCreateNestedManyWithoutAdminInput
    wallets?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileUncheckedCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileUncheckedCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerUncheckedCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewUncheckedCreateNestedManyWithoutAdminInput
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUpdateManyWithoutAdminNestedInput
    wallets?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUncheckedUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUncheckedUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUncheckedUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUncheckedUpdateManyWithoutAdminNestedInput
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
  }

  export type UserUpdateManyMutationInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MaintainerProfileCreateInput = {
    bio?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutMaintainer_profileInput
  }

  export type MaintainerProfileUncheckedCreateInput = {
    user_id: string
    bio?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MaintainerProfileUpdateInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMaintainer_profileNestedInput
  }

  export type MaintainerProfileUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintainerProfileCreateManyInput = {
    user_id: string
    bio?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MaintainerProfileUpdateManyMutationInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintainerProfileUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorProfileCreateInput = {
    skills?: ContributorProfileCreateskillsInput | string[]
    bio?: string | null
    portfolio_url?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutContributor_profileInput
  }

  export type ContributorProfileUncheckedCreateInput = {
    user_id: string
    skills?: ContributorProfileCreateskillsInput | string[]
    bio?: string | null
    portfolio_url?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContributorProfileUpdateInput = {
    skills?: ContributorProfileUpdateskillsInput | string[]
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio_url?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutContributor_profileNestedInput
  }

  export type ContributorProfileUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    skills?: ContributorProfileUpdateskillsInput | string[]
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio_url?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorProfileCreateManyInput = {
    user_id: string
    skills?: ContributorProfileCreateskillsInput | string[]
    bio?: string | null
    portfolio_url?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContributorProfileUpdateManyMutationInput = {
    skills?: ContributorProfileUpdateskillsInput | string[]
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio_url?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorProfileUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    skills?: ContributorProfileUpdateskillsInput | string[]
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio_url?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutAdmin_profileInput
  }

  export type AdminProfileUncheckedCreateInput = {
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AdminProfileUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAdmin_profileNestedInput
  }

  export type AdminProfileUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileCreateManyInput = {
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AdminProfileUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateInput = {
    wallet_id?: string
    address: string
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutWalletsInput
  }

  export type WalletUncheckedCreateInput = {
    wallet_id?: string
    user_id: string
    address: string
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WalletUpdateInput = {
    wallet_id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    wallet_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateManyInput = {
    wallet_id?: string
    user_id: string
    address: string
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WalletUpdateManyMutationInput = {
    wallet_id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyInput = {
    wallet_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    project_id?: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack?: ProjectCreatetech_stackInput | string[]
    category: $Enums.ProjectCategory
    status?: $Enums.ProjectStatus
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    reviewed_at?: Date | string | null
    repositories?: RepositoryCreateNestedManyWithoutProjectInput
    maintainers?: ProjectMaintainerCreateNestedManyWithoutProjectInput
    reviews?: ProjectReviewCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    project_id?: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack?: ProjectCreatetech_stackInput | string[]
    category: $Enums.ProjectCategory
    status?: $Enums.ProjectStatus
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    reviewed_at?: Date | string | null
    repositories?: RepositoryUncheckedCreateNestedManyWithoutProjectInput
    maintainers?: ProjectMaintainerUncheckedCreateNestedManyWithoutProjectInput
    reviews?: ProjectReviewUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repositories?: RepositoryUpdateManyWithoutProjectNestedInput
    maintainers?: ProjectMaintainerUpdateManyWithoutProjectNestedInput
    reviews?: ProjectReviewUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repositories?: RepositoryUncheckedUpdateManyWithoutProjectNestedInput
    maintainers?: ProjectMaintainerUncheckedUpdateManyWithoutProjectNestedInput
    reviews?: ProjectReviewUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    project_id?: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack?: ProjectCreatetech_stackInput | string[]
    category: $Enums.ProjectCategory
    status?: $Enums.ProjectStatus
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    reviewed_at?: Date | string | null
  }

  export type ProjectUpdateManyMutationInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepositoryCreateInput = {
    github_repo_id: bigint | number
    github_url: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    project: ProjectCreateNestedOneWithoutRepositoriesInput
  }

  export type RepositoryUncheckedCreateInput = {
    github_repo_id: bigint | number
    project_id: string
    github_url: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RepositoryUpdateInput = {
    github_repo_id?: BigIntFieldUpdateOperationsInput | bigint | number
    github_url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutRepositoriesNestedInput
  }

  export type RepositoryUncheckedUpdateInput = {
    github_repo_id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: StringFieldUpdateOperationsInput | string
    github_url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryCreateManyInput = {
    github_repo_id: bigint | number
    project_id: string
    github_url: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RepositoryUpdateManyMutationInput = {
    github_repo_id?: BigIntFieldUpdateOperationsInput | bigint | number
    github_url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryUncheckedUpdateManyInput = {
    github_repo_id?: BigIntFieldUpdateOperationsInput | bigint | number
    project_id?: StringFieldUpdateOperationsInput | string
    github_url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMaintainerCreateInput = {
    id?: string
    is_owner?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    project: ProjectCreateNestedOneWithoutMaintainersInput
    maintainer: UserCreateNestedOneWithoutProject_maintainersInput
  }

  export type ProjectMaintainerUncheckedCreateInput = {
    id?: string
    project_id: string
    maintainer_id: string
    is_owner?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
  }

  export type ProjectMaintainerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    project?: ProjectUpdateOneRequiredWithoutMaintainersNestedInput
    maintainer?: UserUpdateOneRequiredWithoutProject_maintainersNestedInput
  }

  export type ProjectMaintainerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    maintainer_id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectMaintainerCreateManyInput = {
    id?: string
    project_id: string
    maintainer_id: string
    is_owner?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
  }

  export type ProjectMaintainerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectMaintainerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    maintainer_id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectReviewCreateInput = {
    review_id?: string
    action: $Enums.ReviewAction
    reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    project: ProjectCreateNestedOneWithoutReviewsInput
    admin: UserCreateNestedOneWithoutProject_reviewsInput
  }

  export type ProjectReviewUncheckedCreateInput = {
    review_id?: string
    project_id: string
    admin_id: string
    action: $Enums.ReviewAction
    reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectReviewUpdateInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutReviewsNestedInput
    admin?: UserUpdateOneRequiredWithoutProject_reviewsNestedInput
  }

  export type ProjectReviewUncheckedUpdateInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectReviewCreateManyInput = {
    review_id?: string
    project_id: string
    admin_id: string
    action: $Enums.ReviewAction
    reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectReviewUpdateManyMutationInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectReviewUncheckedUpdateManyInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel> | null
    has?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    hasSome?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MaintainerProfileNullableScalarRelationFilter = {
    is?: MaintainerProfileWhereInput | null
    isNot?: MaintainerProfileWhereInput | null
  }

  export type ContributorProfileNullableScalarRelationFilter = {
    is?: ContributorProfileWhereInput | null
    isNot?: ContributorProfileWhereInput | null
  }

  export type AdminProfileNullableScalarRelationFilter = {
    is?: AdminProfileWhereInput | null
    isNot?: AdminProfileWhereInput | null
  }

  export type ProjectMaintainerListRelationFilter = {
    every?: ProjectMaintainerWhereInput
    some?: ProjectMaintainerWhereInput
    none?: ProjectMaintainerWhereInput
  }

  export type ProjectReviewListRelationFilter = {
    every?: ProjectReviewWhereInput
    some?: ProjectReviewWhereInput
    none?: ProjectReviewWhereInput
  }

  export type WalletListRelationFilter = {
    every?: WalletWhereInput
    some?: WalletWhereInput
    none?: WalletWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectMaintainerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WalletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    avatar_url?: SortOrder
    roles?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    avatar_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    avatar_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MaintainerProfileCountOrderByAggregateInput = {
    user_id?: SortOrder
    bio?: SortOrder
    social_media?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MaintainerProfileMaxOrderByAggregateInput = {
    user_id?: SortOrder
    bio?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type MaintainerProfileMinOrderByAggregateInput = {
    user_id?: SortOrder
    bio?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ContributorProfileCountOrderByAggregateInput = {
    user_id?: SortOrder
    skills?: SortOrder
    bio?: SortOrder
    portfolio_url?: SortOrder
    social_media?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContributorProfileMaxOrderByAggregateInput = {
    user_id?: SortOrder
    bio?: SortOrder
    portfolio_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ContributorProfileMinOrderByAggregateInput = {
    user_id?: SortOrder
    bio?: SortOrder
    portfolio_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AdminProfileCountOrderByAggregateInput = {
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AdminProfileMaxOrderByAggregateInput = {
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AdminProfileMinOrderByAggregateInput = {
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WalletCountOrderByAggregateInput = {
    wallet_id?: SortOrder
    user_id?: SortOrder
    address?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    wallet_id?: SortOrder
    user_id?: SortOrder
    address?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    wallet_id?: SortOrder
    user_id?: SortOrder
    address?: SortOrder
    is_primary?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumProjectCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectCategory | EnumProjectCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectCategory[] | ListEnumProjectCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectCategory[] | ListEnumProjectCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectCategoryFilter<$PrismaModel> | $Enums.ProjectCategory
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RepositoryListRelationFilter = {
    every?: RepositoryWhereInput
    some?: RepositoryWhereInput
    none?: RepositoryWhereInput
  }

  export type RepositoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    project_id?: SortOrder
    name?: SortOrder
    github_handle?: SortOrder
    short_description?: SortOrder
    description?: SortOrder
    tech_stack?: SortOrder
    category?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reviewed_at?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    project_id?: SortOrder
    name?: SortOrder
    github_handle?: SortOrder
    short_description?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reviewed_at?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    project_id?: SortOrder
    name?: SortOrder
    github_handle?: SortOrder
    short_description?: SortOrder
    description?: SortOrder
    category?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reviewed_at?: SortOrder
  }

  export type EnumProjectCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectCategory | EnumProjectCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectCategory[] | ListEnumProjectCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectCategory[] | ListEnumProjectCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ProjectCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectCategoryFilter<$PrismaModel>
    _max?: NestedEnumProjectCategoryFilter<$PrismaModel>
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type RepositoryCountOrderByAggregateInput = {
    github_repo_id?: SortOrder
    project_id?: SortOrder
    github_url?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RepositoryAvgOrderByAggregateInput = {
    github_repo_id?: SortOrder
  }

  export type RepositoryMaxOrderByAggregateInput = {
    github_repo_id?: SortOrder
    project_id?: SortOrder
    github_url?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RepositoryMinOrderByAggregateInput = {
    github_repo_id?: SortOrder
    project_id?: SortOrder
    github_url?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RepositorySumOrderByAggregateInput = {
    github_repo_id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type ProjectMaintainerProject_idMaintainer_idCompoundUniqueInput = {
    project_id: string
    maintainer_id: string
  }

  export type ProjectMaintainerCountOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    maintainer_id?: SortOrder
    is_owner?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
  }

  export type ProjectMaintainerMaxOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    maintainer_id?: SortOrder
    is_owner?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
  }

  export type ProjectMaintainerMinOrderByAggregateInput = {
    id?: SortOrder
    project_id?: SortOrder
    maintainer_id?: SortOrder
    is_owner?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_active?: SortOrder
  }

  export type EnumReviewActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewAction | EnumReviewActionFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewAction[] | ListEnumReviewActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewAction[] | ListEnumReviewActionFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewActionFilter<$PrismaModel> | $Enums.ReviewAction
  }

  export type ProjectReviewCountOrderByAggregateInput = {
    review_id?: SortOrder
    project_id?: SortOrder
    admin_id?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectReviewMaxOrderByAggregateInput = {
    review_id?: SortOrder
    project_id?: SortOrder
    admin_id?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectReviewMinOrderByAggregateInput = {
    review_id?: SortOrder
    project_id?: SortOrder
    admin_id?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumReviewActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewAction | EnumReviewActionFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewAction[] | ListEnumReviewActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewAction[] | ListEnumReviewActionFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewActionWithAggregatesFilter<$PrismaModel> | $Enums.ReviewAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewActionFilter<$PrismaModel>
    _max?: NestedEnumReviewActionFilter<$PrismaModel>
  }

  export type UserCreaterolesInput = {
    set: $Enums.UserRole[]
  }

  export type MaintainerProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<MaintainerProfileCreateWithoutUserInput, MaintainerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MaintainerProfileCreateOrConnectWithoutUserInput
    connect?: MaintainerProfileWhereUniqueInput
  }

  export type ContributorProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ContributorProfileCreateWithoutUserInput, ContributorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ContributorProfileCreateOrConnectWithoutUserInput
    connect?: ContributorProfileWhereUniqueInput
  }

  export type AdminProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUserInput
    connect?: AdminProfileWhereUniqueInput
  }

  export type ProjectMaintainerCreateNestedManyWithoutMaintainerInput = {
    create?: XOR<ProjectMaintainerCreateWithoutMaintainerInput, ProjectMaintainerUncheckedCreateWithoutMaintainerInput> | ProjectMaintainerCreateWithoutMaintainerInput[] | ProjectMaintainerUncheckedCreateWithoutMaintainerInput[]
    connectOrCreate?: ProjectMaintainerCreateOrConnectWithoutMaintainerInput | ProjectMaintainerCreateOrConnectWithoutMaintainerInput[]
    createMany?: ProjectMaintainerCreateManyMaintainerInputEnvelope
    connect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
  }

  export type ProjectReviewCreateNestedManyWithoutAdminInput = {
    create?: XOR<ProjectReviewCreateWithoutAdminInput, ProjectReviewUncheckedCreateWithoutAdminInput> | ProjectReviewCreateWithoutAdminInput[] | ProjectReviewUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ProjectReviewCreateOrConnectWithoutAdminInput | ProjectReviewCreateOrConnectWithoutAdminInput[]
    createMany?: ProjectReviewCreateManyAdminInputEnvelope
    connect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
  }

  export type WalletCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type MaintainerProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<MaintainerProfileCreateWithoutUserInput, MaintainerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MaintainerProfileCreateOrConnectWithoutUserInput
    connect?: MaintainerProfileWhereUniqueInput
  }

  export type ContributorProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ContributorProfileCreateWithoutUserInput, ContributorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ContributorProfileCreateOrConnectWithoutUserInput
    connect?: ContributorProfileWhereUniqueInput
  }

  export type AdminProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUserInput
    connect?: AdminProfileWhereUniqueInput
  }

  export type ProjectMaintainerUncheckedCreateNestedManyWithoutMaintainerInput = {
    create?: XOR<ProjectMaintainerCreateWithoutMaintainerInput, ProjectMaintainerUncheckedCreateWithoutMaintainerInput> | ProjectMaintainerCreateWithoutMaintainerInput[] | ProjectMaintainerUncheckedCreateWithoutMaintainerInput[]
    connectOrCreate?: ProjectMaintainerCreateOrConnectWithoutMaintainerInput | ProjectMaintainerCreateOrConnectWithoutMaintainerInput[]
    createMany?: ProjectMaintainerCreateManyMaintainerInputEnvelope
    connect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
  }

  export type ProjectReviewUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<ProjectReviewCreateWithoutAdminInput, ProjectReviewUncheckedCreateWithoutAdminInput> | ProjectReviewCreateWithoutAdminInput[] | ProjectReviewUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ProjectReviewCreateOrConnectWithoutAdminInput | ProjectReviewCreateOrConnectWithoutAdminInput[]
    createMany?: ProjectReviewCreateManyAdminInputEnvelope
    connect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
  }

  export type WalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdaterolesInput = {
    set?: $Enums.UserRole[]
    push?: $Enums.UserRole | $Enums.UserRole[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MaintainerProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<MaintainerProfileCreateWithoutUserInput, MaintainerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MaintainerProfileCreateOrConnectWithoutUserInput
    upsert?: MaintainerProfileUpsertWithoutUserInput
    disconnect?: MaintainerProfileWhereInput | boolean
    delete?: MaintainerProfileWhereInput | boolean
    connect?: MaintainerProfileWhereUniqueInput
    update?: XOR<XOR<MaintainerProfileUpdateToOneWithWhereWithoutUserInput, MaintainerProfileUpdateWithoutUserInput>, MaintainerProfileUncheckedUpdateWithoutUserInput>
  }

  export type ContributorProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ContributorProfileCreateWithoutUserInput, ContributorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ContributorProfileCreateOrConnectWithoutUserInput
    upsert?: ContributorProfileUpsertWithoutUserInput
    disconnect?: ContributorProfileWhereInput | boolean
    delete?: ContributorProfileWhereInput | boolean
    connect?: ContributorProfileWhereUniqueInput
    update?: XOR<XOR<ContributorProfileUpdateToOneWithWhereWithoutUserInput, ContributorProfileUpdateWithoutUserInput>, ContributorProfileUncheckedUpdateWithoutUserInput>
  }

  export type AdminProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUserInput
    upsert?: AdminProfileUpsertWithoutUserInput
    disconnect?: AdminProfileWhereInput | boolean
    delete?: AdminProfileWhereInput | boolean
    connect?: AdminProfileWhereUniqueInput
    update?: XOR<XOR<AdminProfileUpdateToOneWithWhereWithoutUserInput, AdminProfileUpdateWithoutUserInput>, AdminProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProjectMaintainerUpdateManyWithoutMaintainerNestedInput = {
    create?: XOR<ProjectMaintainerCreateWithoutMaintainerInput, ProjectMaintainerUncheckedCreateWithoutMaintainerInput> | ProjectMaintainerCreateWithoutMaintainerInput[] | ProjectMaintainerUncheckedCreateWithoutMaintainerInput[]
    connectOrCreate?: ProjectMaintainerCreateOrConnectWithoutMaintainerInput | ProjectMaintainerCreateOrConnectWithoutMaintainerInput[]
    upsert?: ProjectMaintainerUpsertWithWhereUniqueWithoutMaintainerInput | ProjectMaintainerUpsertWithWhereUniqueWithoutMaintainerInput[]
    createMany?: ProjectMaintainerCreateManyMaintainerInputEnvelope
    set?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    disconnect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    delete?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    connect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    update?: ProjectMaintainerUpdateWithWhereUniqueWithoutMaintainerInput | ProjectMaintainerUpdateWithWhereUniqueWithoutMaintainerInput[]
    updateMany?: ProjectMaintainerUpdateManyWithWhereWithoutMaintainerInput | ProjectMaintainerUpdateManyWithWhereWithoutMaintainerInput[]
    deleteMany?: ProjectMaintainerScalarWhereInput | ProjectMaintainerScalarWhereInput[]
  }

  export type ProjectReviewUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ProjectReviewCreateWithoutAdminInput, ProjectReviewUncheckedCreateWithoutAdminInput> | ProjectReviewCreateWithoutAdminInput[] | ProjectReviewUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ProjectReviewCreateOrConnectWithoutAdminInput | ProjectReviewCreateOrConnectWithoutAdminInput[]
    upsert?: ProjectReviewUpsertWithWhereUniqueWithoutAdminInput | ProjectReviewUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ProjectReviewCreateManyAdminInputEnvelope
    set?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    disconnect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    delete?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    connect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    update?: ProjectReviewUpdateWithWhereUniqueWithoutAdminInput | ProjectReviewUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ProjectReviewUpdateManyWithWhereWithoutAdminInput | ProjectReviewUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ProjectReviewScalarWhereInput | ProjectReviewScalarWhereInput[]
  }

  export type WalletUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type MaintainerProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<MaintainerProfileCreateWithoutUserInput, MaintainerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MaintainerProfileCreateOrConnectWithoutUserInput
    upsert?: MaintainerProfileUpsertWithoutUserInput
    disconnect?: MaintainerProfileWhereInput | boolean
    delete?: MaintainerProfileWhereInput | boolean
    connect?: MaintainerProfileWhereUniqueInput
    update?: XOR<XOR<MaintainerProfileUpdateToOneWithWhereWithoutUserInput, MaintainerProfileUpdateWithoutUserInput>, MaintainerProfileUncheckedUpdateWithoutUserInput>
  }

  export type ContributorProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ContributorProfileCreateWithoutUserInput, ContributorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ContributorProfileCreateOrConnectWithoutUserInput
    upsert?: ContributorProfileUpsertWithoutUserInput
    disconnect?: ContributorProfileWhereInput | boolean
    delete?: ContributorProfileWhereInput | boolean
    connect?: ContributorProfileWhereUniqueInput
    update?: XOR<XOR<ContributorProfileUpdateToOneWithWhereWithoutUserInput, ContributorProfileUpdateWithoutUserInput>, ContributorProfileUncheckedUpdateWithoutUserInput>
  }

  export type AdminProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminProfileCreateOrConnectWithoutUserInput
    upsert?: AdminProfileUpsertWithoutUserInput
    disconnect?: AdminProfileWhereInput | boolean
    delete?: AdminProfileWhereInput | boolean
    connect?: AdminProfileWhereUniqueInput
    update?: XOR<XOR<AdminProfileUpdateToOneWithWhereWithoutUserInput, AdminProfileUpdateWithoutUserInput>, AdminProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProjectMaintainerUncheckedUpdateManyWithoutMaintainerNestedInput = {
    create?: XOR<ProjectMaintainerCreateWithoutMaintainerInput, ProjectMaintainerUncheckedCreateWithoutMaintainerInput> | ProjectMaintainerCreateWithoutMaintainerInput[] | ProjectMaintainerUncheckedCreateWithoutMaintainerInput[]
    connectOrCreate?: ProjectMaintainerCreateOrConnectWithoutMaintainerInput | ProjectMaintainerCreateOrConnectWithoutMaintainerInput[]
    upsert?: ProjectMaintainerUpsertWithWhereUniqueWithoutMaintainerInput | ProjectMaintainerUpsertWithWhereUniqueWithoutMaintainerInput[]
    createMany?: ProjectMaintainerCreateManyMaintainerInputEnvelope
    set?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    disconnect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    delete?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    connect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    update?: ProjectMaintainerUpdateWithWhereUniqueWithoutMaintainerInput | ProjectMaintainerUpdateWithWhereUniqueWithoutMaintainerInput[]
    updateMany?: ProjectMaintainerUpdateManyWithWhereWithoutMaintainerInput | ProjectMaintainerUpdateManyWithWhereWithoutMaintainerInput[]
    deleteMany?: ProjectMaintainerScalarWhereInput | ProjectMaintainerScalarWhereInput[]
  }

  export type ProjectReviewUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ProjectReviewCreateWithoutAdminInput, ProjectReviewUncheckedCreateWithoutAdminInput> | ProjectReviewCreateWithoutAdminInput[] | ProjectReviewUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ProjectReviewCreateOrConnectWithoutAdminInput | ProjectReviewCreateOrConnectWithoutAdminInput[]
    upsert?: ProjectReviewUpsertWithWhereUniqueWithoutAdminInput | ProjectReviewUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ProjectReviewCreateManyAdminInputEnvelope
    set?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    disconnect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    delete?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    connect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    update?: ProjectReviewUpdateWithWhereUniqueWithoutAdminInput | ProjectReviewUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ProjectReviewUpdateManyWithWhereWithoutAdminInput | ProjectReviewUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ProjectReviewScalarWhereInput | ProjectReviewScalarWhereInput[]
  }

  export type WalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput> | WalletCreateWithoutUserInput[] | WalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput | WalletCreateOrConnectWithoutUserInput[]
    upsert?: WalletUpsertWithWhereUniqueWithoutUserInput | WalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletCreateManyUserInputEnvelope
    set?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    disconnect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    delete?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    connect?: WalletWhereUniqueInput | WalletWhereUniqueInput[]
    update?: WalletUpdateWithWhereUniqueWithoutUserInput | WalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletUpdateManyWithWhereWithoutUserInput | WalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletScalarWhereInput | WalletScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMaintainer_profileInput = {
    create?: XOR<UserCreateWithoutMaintainer_profileInput, UserUncheckedCreateWithoutMaintainer_profileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMaintainer_profileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMaintainer_profileNestedInput = {
    create?: XOR<UserCreateWithoutMaintainer_profileInput, UserUncheckedCreateWithoutMaintainer_profileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMaintainer_profileInput
    upsert?: UserUpsertWithoutMaintainer_profileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMaintainer_profileInput, UserUpdateWithoutMaintainer_profileInput>, UserUncheckedUpdateWithoutMaintainer_profileInput>
  }

  export type ContributorProfileCreateskillsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutContributor_profileInput = {
    create?: XOR<UserCreateWithoutContributor_profileInput, UserUncheckedCreateWithoutContributor_profileInput>
    connectOrCreate?: UserCreateOrConnectWithoutContributor_profileInput
    connect?: UserWhereUniqueInput
  }

  export type ContributorProfileUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutContributor_profileNestedInput = {
    create?: XOR<UserCreateWithoutContributor_profileInput, UserUncheckedCreateWithoutContributor_profileInput>
    connectOrCreate?: UserCreateOrConnectWithoutContributor_profileInput
    upsert?: UserUpsertWithoutContributor_profileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutContributor_profileInput, UserUpdateWithoutContributor_profileInput>, UserUncheckedUpdateWithoutContributor_profileInput>
  }

  export type UserCreateNestedOneWithoutAdmin_profileInput = {
    create?: XOR<UserCreateWithoutAdmin_profileInput, UserUncheckedCreateWithoutAdmin_profileInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdmin_profileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAdmin_profileNestedInput = {
    create?: XOR<UserCreateWithoutAdmin_profileInput, UserUncheckedCreateWithoutAdmin_profileInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdmin_profileInput
    upsert?: UserUpsertWithoutAdmin_profileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdmin_profileInput, UserUpdateWithoutAdmin_profileInput>, UserUncheckedUpdateWithoutAdmin_profileInput>
  }

  export type UserCreateNestedOneWithoutWalletsInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWalletsNestedInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    upsert?: UserUpsertWithoutWalletsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletsInput, UserUpdateWithoutWalletsInput>, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type ProjectCreatetech_stackInput = {
    set: string[]
  }

  export type RepositoryCreateNestedManyWithoutProjectInput = {
    create?: XOR<RepositoryCreateWithoutProjectInput, RepositoryUncheckedCreateWithoutProjectInput> | RepositoryCreateWithoutProjectInput[] | RepositoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutProjectInput | RepositoryCreateOrConnectWithoutProjectInput[]
    createMany?: RepositoryCreateManyProjectInputEnvelope
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
  }

  export type ProjectMaintainerCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMaintainerCreateWithoutProjectInput, ProjectMaintainerUncheckedCreateWithoutProjectInput> | ProjectMaintainerCreateWithoutProjectInput[] | ProjectMaintainerUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMaintainerCreateOrConnectWithoutProjectInput | ProjectMaintainerCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMaintainerCreateManyProjectInputEnvelope
    connect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
  }

  export type ProjectReviewCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectReviewCreateWithoutProjectInput, ProjectReviewUncheckedCreateWithoutProjectInput> | ProjectReviewCreateWithoutProjectInput[] | ProjectReviewUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectReviewCreateOrConnectWithoutProjectInput | ProjectReviewCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectReviewCreateManyProjectInputEnvelope
    connect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
  }

  export type RepositoryUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<RepositoryCreateWithoutProjectInput, RepositoryUncheckedCreateWithoutProjectInput> | RepositoryCreateWithoutProjectInput[] | RepositoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutProjectInput | RepositoryCreateOrConnectWithoutProjectInput[]
    createMany?: RepositoryCreateManyProjectInputEnvelope
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
  }

  export type ProjectMaintainerUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMaintainerCreateWithoutProjectInput, ProjectMaintainerUncheckedCreateWithoutProjectInput> | ProjectMaintainerCreateWithoutProjectInput[] | ProjectMaintainerUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMaintainerCreateOrConnectWithoutProjectInput | ProjectMaintainerCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMaintainerCreateManyProjectInputEnvelope
    connect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
  }

  export type ProjectReviewUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectReviewCreateWithoutProjectInput, ProjectReviewUncheckedCreateWithoutProjectInput> | ProjectReviewCreateWithoutProjectInput[] | ProjectReviewUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectReviewCreateOrConnectWithoutProjectInput | ProjectReviewCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectReviewCreateManyProjectInputEnvelope
    connect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
  }

  export type ProjectUpdatetech_stackInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumProjectCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ProjectCategory
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type RepositoryUpdateManyWithoutProjectNestedInput = {
    create?: XOR<RepositoryCreateWithoutProjectInput, RepositoryUncheckedCreateWithoutProjectInput> | RepositoryCreateWithoutProjectInput[] | RepositoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutProjectInput | RepositoryCreateOrConnectWithoutProjectInput[]
    upsert?: RepositoryUpsertWithWhereUniqueWithoutProjectInput | RepositoryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: RepositoryCreateManyProjectInputEnvelope
    set?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    disconnect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    delete?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    update?: RepositoryUpdateWithWhereUniqueWithoutProjectInput | RepositoryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: RepositoryUpdateManyWithWhereWithoutProjectInput | RepositoryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
  }

  export type ProjectMaintainerUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMaintainerCreateWithoutProjectInput, ProjectMaintainerUncheckedCreateWithoutProjectInput> | ProjectMaintainerCreateWithoutProjectInput[] | ProjectMaintainerUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMaintainerCreateOrConnectWithoutProjectInput | ProjectMaintainerCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMaintainerUpsertWithWhereUniqueWithoutProjectInput | ProjectMaintainerUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMaintainerCreateManyProjectInputEnvelope
    set?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    disconnect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    delete?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    connect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    update?: ProjectMaintainerUpdateWithWhereUniqueWithoutProjectInput | ProjectMaintainerUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMaintainerUpdateManyWithWhereWithoutProjectInput | ProjectMaintainerUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMaintainerScalarWhereInput | ProjectMaintainerScalarWhereInput[]
  }

  export type ProjectReviewUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectReviewCreateWithoutProjectInput, ProjectReviewUncheckedCreateWithoutProjectInput> | ProjectReviewCreateWithoutProjectInput[] | ProjectReviewUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectReviewCreateOrConnectWithoutProjectInput | ProjectReviewCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectReviewUpsertWithWhereUniqueWithoutProjectInput | ProjectReviewUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectReviewCreateManyProjectInputEnvelope
    set?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    disconnect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    delete?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    connect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    update?: ProjectReviewUpdateWithWhereUniqueWithoutProjectInput | ProjectReviewUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectReviewUpdateManyWithWhereWithoutProjectInput | ProjectReviewUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectReviewScalarWhereInput | ProjectReviewScalarWhereInput[]
  }

  export type RepositoryUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<RepositoryCreateWithoutProjectInput, RepositoryUncheckedCreateWithoutProjectInput> | RepositoryCreateWithoutProjectInput[] | RepositoryUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutProjectInput | RepositoryCreateOrConnectWithoutProjectInput[]
    upsert?: RepositoryUpsertWithWhereUniqueWithoutProjectInput | RepositoryUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: RepositoryCreateManyProjectInputEnvelope
    set?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    disconnect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    delete?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    update?: RepositoryUpdateWithWhereUniqueWithoutProjectInput | RepositoryUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: RepositoryUpdateManyWithWhereWithoutProjectInput | RepositoryUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
  }

  export type ProjectMaintainerUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMaintainerCreateWithoutProjectInput, ProjectMaintainerUncheckedCreateWithoutProjectInput> | ProjectMaintainerCreateWithoutProjectInput[] | ProjectMaintainerUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMaintainerCreateOrConnectWithoutProjectInput | ProjectMaintainerCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMaintainerUpsertWithWhereUniqueWithoutProjectInput | ProjectMaintainerUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMaintainerCreateManyProjectInputEnvelope
    set?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    disconnect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    delete?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    connect?: ProjectMaintainerWhereUniqueInput | ProjectMaintainerWhereUniqueInput[]
    update?: ProjectMaintainerUpdateWithWhereUniqueWithoutProjectInput | ProjectMaintainerUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMaintainerUpdateManyWithWhereWithoutProjectInput | ProjectMaintainerUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMaintainerScalarWhereInput | ProjectMaintainerScalarWhereInput[]
  }

  export type ProjectReviewUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectReviewCreateWithoutProjectInput, ProjectReviewUncheckedCreateWithoutProjectInput> | ProjectReviewCreateWithoutProjectInput[] | ProjectReviewUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectReviewCreateOrConnectWithoutProjectInput | ProjectReviewCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectReviewUpsertWithWhereUniqueWithoutProjectInput | ProjectReviewUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectReviewCreateManyProjectInputEnvelope
    set?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    disconnect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    delete?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    connect?: ProjectReviewWhereUniqueInput | ProjectReviewWhereUniqueInput[]
    update?: ProjectReviewUpdateWithWhereUniqueWithoutProjectInput | ProjectReviewUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectReviewUpdateManyWithWhereWithoutProjectInput | ProjectReviewUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectReviewScalarWhereInput | ProjectReviewScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutRepositoriesInput = {
    create?: XOR<ProjectCreateWithoutRepositoriesInput, ProjectUncheckedCreateWithoutRepositoriesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutRepositoriesInput
    connect?: ProjectWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type ProjectUpdateOneRequiredWithoutRepositoriesNestedInput = {
    create?: XOR<ProjectCreateWithoutRepositoriesInput, ProjectUncheckedCreateWithoutRepositoriesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutRepositoriesInput
    upsert?: ProjectUpsertWithoutRepositoriesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutRepositoriesInput, ProjectUpdateWithoutRepositoriesInput>, ProjectUncheckedUpdateWithoutRepositoriesInput>
  }

  export type ProjectCreateNestedOneWithoutMaintainersInput = {
    create?: XOR<ProjectCreateWithoutMaintainersInput, ProjectUncheckedCreateWithoutMaintainersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMaintainersInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProject_maintainersInput = {
    create?: XOR<UserCreateWithoutProject_maintainersInput, UserUncheckedCreateWithoutProject_maintainersInput>
    connectOrCreate?: UserCreateOrConnectWithoutProject_maintainersInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutMaintainersNestedInput = {
    create?: XOR<ProjectCreateWithoutMaintainersInput, ProjectUncheckedCreateWithoutMaintainersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMaintainersInput
    upsert?: ProjectUpsertWithoutMaintainersInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutMaintainersInput, ProjectUpdateWithoutMaintainersInput>, ProjectUncheckedUpdateWithoutMaintainersInput>
  }

  export type UserUpdateOneRequiredWithoutProject_maintainersNestedInput = {
    create?: XOR<UserCreateWithoutProject_maintainersInput, UserUncheckedCreateWithoutProject_maintainersInput>
    connectOrCreate?: UserCreateOrConnectWithoutProject_maintainersInput
    upsert?: UserUpsertWithoutProject_maintainersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProject_maintainersInput, UserUpdateWithoutProject_maintainersInput>, UserUncheckedUpdateWithoutProject_maintainersInput>
  }

  export type ProjectCreateNestedOneWithoutReviewsInput = {
    create?: XOR<ProjectCreateWithoutReviewsInput, ProjectUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutReviewsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProject_reviewsInput = {
    create?: XOR<UserCreateWithoutProject_reviewsInput, UserUncheckedCreateWithoutProject_reviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProject_reviewsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumReviewActionFieldUpdateOperationsInput = {
    set?: $Enums.ReviewAction
  }

  export type ProjectUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<ProjectCreateWithoutReviewsInput, ProjectUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutReviewsInput
    upsert?: ProjectUpsertWithoutReviewsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutReviewsInput, ProjectUpdateWithoutReviewsInput>, ProjectUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutProject_reviewsNestedInput = {
    create?: XOR<UserCreateWithoutProject_reviewsInput, UserUncheckedCreateWithoutProject_reviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProject_reviewsInput
    upsert?: UserUpsertWithoutProject_reviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProject_reviewsInput, UserUpdateWithoutProject_reviewsInput>, UserUncheckedUpdateWithoutProject_reviewsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumProjectCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectCategory | EnumProjectCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectCategory[] | ListEnumProjectCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectCategory[] | ListEnumProjectCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectCategoryFilter<$PrismaModel> | $Enums.ProjectCategory
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumProjectCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectCategory | EnumProjectCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectCategory[] | ListEnumProjectCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectCategory[] | ListEnumProjectCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ProjectCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectCategoryFilter<$PrismaModel>
    _max?: NestedEnumProjectCategoryFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumReviewActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewAction | EnumReviewActionFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewAction[] | ListEnumReviewActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewAction[] | ListEnumReviewActionFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewActionFilter<$PrismaModel> | $Enums.ReviewAction
  }

  export type NestedEnumReviewActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewAction | EnumReviewActionFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewAction[] | ListEnumReviewActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewAction[] | ListEnumReviewActionFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewActionWithAggregatesFilter<$PrismaModel> | $Enums.ReviewAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewActionFilter<$PrismaModel>
    _max?: NestedEnumReviewActionFilter<$PrismaModel>
  }

  export type MaintainerProfileCreateWithoutUserInput = {
    bio?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MaintainerProfileUncheckedCreateWithoutUserInput = {
    bio?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MaintainerProfileCreateOrConnectWithoutUserInput = {
    where: MaintainerProfileWhereUniqueInput
    create: XOR<MaintainerProfileCreateWithoutUserInput, MaintainerProfileUncheckedCreateWithoutUserInput>
  }

  export type ContributorProfileCreateWithoutUserInput = {
    skills?: ContributorProfileCreateskillsInput | string[]
    bio?: string | null
    portfolio_url?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContributorProfileUncheckedCreateWithoutUserInput = {
    skills?: ContributorProfileCreateskillsInput | string[]
    bio?: string | null
    portfolio_url?: string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ContributorProfileCreateOrConnectWithoutUserInput = {
    where: ContributorProfileWhereUniqueInput
    create: XOR<ContributorProfileCreateWithoutUserInput, ContributorProfileUncheckedCreateWithoutUserInput>
  }

  export type AdminProfileCreateWithoutUserInput = {
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AdminProfileUncheckedCreateWithoutUserInput = {
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AdminProfileCreateOrConnectWithoutUserInput = {
    where: AdminProfileWhereUniqueInput
    create: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
  }

  export type ProjectMaintainerCreateWithoutMaintainerInput = {
    id?: string
    is_owner?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    project: ProjectCreateNestedOneWithoutMaintainersInput
  }

  export type ProjectMaintainerUncheckedCreateWithoutMaintainerInput = {
    id?: string
    project_id: string
    is_owner?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
  }

  export type ProjectMaintainerCreateOrConnectWithoutMaintainerInput = {
    where: ProjectMaintainerWhereUniqueInput
    create: XOR<ProjectMaintainerCreateWithoutMaintainerInput, ProjectMaintainerUncheckedCreateWithoutMaintainerInput>
  }

  export type ProjectMaintainerCreateManyMaintainerInputEnvelope = {
    data: ProjectMaintainerCreateManyMaintainerInput | ProjectMaintainerCreateManyMaintainerInput[]
    skipDuplicates?: boolean
  }

  export type ProjectReviewCreateWithoutAdminInput = {
    review_id?: string
    action: $Enums.ReviewAction
    reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    project: ProjectCreateNestedOneWithoutReviewsInput
  }

  export type ProjectReviewUncheckedCreateWithoutAdminInput = {
    review_id?: string
    project_id: string
    action: $Enums.ReviewAction
    reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectReviewCreateOrConnectWithoutAdminInput = {
    where: ProjectReviewWhereUniqueInput
    create: XOR<ProjectReviewCreateWithoutAdminInput, ProjectReviewUncheckedCreateWithoutAdminInput>
  }

  export type ProjectReviewCreateManyAdminInputEnvelope = {
    data: ProjectReviewCreateManyAdminInput | ProjectReviewCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type WalletCreateWithoutUserInput = {
    wallet_id?: string
    address: string
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    wallet_id?: string
    address: string
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletCreateManyUserInputEnvelope = {
    data: WalletCreateManyUserInput | WalletCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MaintainerProfileUpsertWithoutUserInput = {
    update: XOR<MaintainerProfileUpdateWithoutUserInput, MaintainerProfileUncheckedUpdateWithoutUserInput>
    create: XOR<MaintainerProfileCreateWithoutUserInput, MaintainerProfileUncheckedCreateWithoutUserInput>
    where?: MaintainerProfileWhereInput
  }

  export type MaintainerProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: MaintainerProfileWhereInput
    data: XOR<MaintainerProfileUpdateWithoutUserInput, MaintainerProfileUncheckedUpdateWithoutUserInput>
  }

  export type MaintainerProfileUpdateWithoutUserInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintainerProfileUncheckedUpdateWithoutUserInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorProfileUpsertWithoutUserInput = {
    update: XOR<ContributorProfileUpdateWithoutUserInput, ContributorProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ContributorProfileCreateWithoutUserInput, ContributorProfileUncheckedCreateWithoutUserInput>
    where?: ContributorProfileWhereInput
  }

  export type ContributorProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ContributorProfileWhereInput
    data: XOR<ContributorProfileUpdateWithoutUserInput, ContributorProfileUncheckedUpdateWithoutUserInput>
  }

  export type ContributorProfileUpdateWithoutUserInput = {
    skills?: ContributorProfileUpdateskillsInput | string[]
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio_url?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributorProfileUncheckedUpdateWithoutUserInput = {
    skills?: ContributorProfileUpdateskillsInput | string[]
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    portfolio_url?: NullableStringFieldUpdateOperationsInput | string | null
    social_media?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileUpsertWithoutUserInput = {
    update: XOR<AdminProfileUpdateWithoutUserInput, AdminProfileUncheckedUpdateWithoutUserInput>
    create: XOR<AdminProfileCreateWithoutUserInput, AdminProfileUncheckedCreateWithoutUserInput>
    where?: AdminProfileWhereInput
  }

  export type AdminProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: AdminProfileWhereInput
    data: XOR<AdminProfileUpdateWithoutUserInput, AdminProfileUncheckedUpdateWithoutUserInput>
  }

  export type AdminProfileUpdateWithoutUserInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminProfileUncheckedUpdateWithoutUserInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMaintainerUpsertWithWhereUniqueWithoutMaintainerInput = {
    where: ProjectMaintainerWhereUniqueInput
    update: XOR<ProjectMaintainerUpdateWithoutMaintainerInput, ProjectMaintainerUncheckedUpdateWithoutMaintainerInput>
    create: XOR<ProjectMaintainerCreateWithoutMaintainerInput, ProjectMaintainerUncheckedCreateWithoutMaintainerInput>
  }

  export type ProjectMaintainerUpdateWithWhereUniqueWithoutMaintainerInput = {
    where: ProjectMaintainerWhereUniqueInput
    data: XOR<ProjectMaintainerUpdateWithoutMaintainerInput, ProjectMaintainerUncheckedUpdateWithoutMaintainerInput>
  }

  export type ProjectMaintainerUpdateManyWithWhereWithoutMaintainerInput = {
    where: ProjectMaintainerScalarWhereInput
    data: XOR<ProjectMaintainerUpdateManyMutationInput, ProjectMaintainerUncheckedUpdateManyWithoutMaintainerInput>
  }

  export type ProjectMaintainerScalarWhereInput = {
    AND?: ProjectMaintainerScalarWhereInput | ProjectMaintainerScalarWhereInput[]
    OR?: ProjectMaintainerScalarWhereInput[]
    NOT?: ProjectMaintainerScalarWhereInput | ProjectMaintainerScalarWhereInput[]
    id?: UuidFilter<"ProjectMaintainer"> | string
    project_id?: UuidFilter<"ProjectMaintainer"> | string
    maintainer_id?: UuidFilter<"ProjectMaintainer"> | string
    is_owner?: BoolFilter<"ProjectMaintainer"> | boolean
    created_at?: DateTimeFilter<"ProjectMaintainer"> | Date | string
    updated_at?: DateTimeFilter<"ProjectMaintainer"> | Date | string
    is_active?: BoolFilter<"ProjectMaintainer"> | boolean
  }

  export type ProjectReviewUpsertWithWhereUniqueWithoutAdminInput = {
    where: ProjectReviewWhereUniqueInput
    update: XOR<ProjectReviewUpdateWithoutAdminInput, ProjectReviewUncheckedUpdateWithoutAdminInput>
    create: XOR<ProjectReviewCreateWithoutAdminInput, ProjectReviewUncheckedCreateWithoutAdminInput>
  }

  export type ProjectReviewUpdateWithWhereUniqueWithoutAdminInput = {
    where: ProjectReviewWhereUniqueInput
    data: XOR<ProjectReviewUpdateWithoutAdminInput, ProjectReviewUncheckedUpdateWithoutAdminInput>
  }

  export type ProjectReviewUpdateManyWithWhereWithoutAdminInput = {
    where: ProjectReviewScalarWhereInput
    data: XOR<ProjectReviewUpdateManyMutationInput, ProjectReviewUncheckedUpdateManyWithoutAdminInput>
  }

  export type ProjectReviewScalarWhereInput = {
    AND?: ProjectReviewScalarWhereInput | ProjectReviewScalarWhereInput[]
    OR?: ProjectReviewScalarWhereInput[]
    NOT?: ProjectReviewScalarWhereInput | ProjectReviewScalarWhereInput[]
    review_id?: UuidFilter<"ProjectReview"> | string
    project_id?: UuidFilter<"ProjectReview"> | string
    admin_id?: UuidFilter<"ProjectReview"> | string
    action?: EnumReviewActionFilter<"ProjectReview"> | $Enums.ReviewAction
    reason?: StringNullableFilter<"ProjectReview"> | string | null
    created_at?: DateTimeFilter<"ProjectReview"> | Date | string
    updated_at?: DateTimeFilter<"ProjectReview"> | Date | string
  }

  export type WalletUpsertWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletUpdateWithWhereUniqueWithoutUserInput = {
    where: WalletWhereUniqueInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateManyWithWhereWithoutUserInput = {
    where: WalletScalarWhereInput
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyWithoutUserInput>
  }

  export type WalletScalarWhereInput = {
    AND?: WalletScalarWhereInput | WalletScalarWhereInput[]
    OR?: WalletScalarWhereInput[]
    NOT?: WalletScalarWhereInput | WalletScalarWhereInput[]
    wallet_id?: UuidFilter<"Wallet"> | string
    user_id?: UuidFilter<"Wallet"> | string
    address?: StringFilter<"Wallet"> | string
    is_primary?: BoolFilter<"Wallet"> | boolean
    created_at?: DateTimeFilter<"Wallet"> | Date | string
    updated_at?: DateTimeFilter<"Wallet"> | Date | string
  }

  export type UserCreateWithoutMaintainer_profileInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    contributor_profile?: ContributorProfileCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewCreateNestedManyWithoutAdminInput
    wallets?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMaintainer_profileInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    contributor_profile?: ContributorProfileUncheckedCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerUncheckedCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewUncheckedCreateNestedManyWithoutAdminInput
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMaintainer_profileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMaintainer_profileInput, UserUncheckedCreateWithoutMaintainer_profileInput>
  }

  export type UserUpsertWithoutMaintainer_profileInput = {
    update: XOR<UserUpdateWithoutMaintainer_profileInput, UserUncheckedUpdateWithoutMaintainer_profileInput>
    create: XOR<UserCreateWithoutMaintainer_profileInput, UserUncheckedCreateWithoutMaintainer_profileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMaintainer_profileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMaintainer_profileInput, UserUncheckedUpdateWithoutMaintainer_profileInput>
  }

  export type UserUpdateWithoutMaintainer_profileInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    contributor_profile?: ContributorProfileUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUpdateManyWithoutAdminNestedInput
    wallets?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMaintainer_profileInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    contributor_profile?: ContributorProfileUncheckedUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUncheckedUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUncheckedUpdateManyWithoutAdminNestedInput
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutContributor_profileInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewCreateNestedManyWithoutAdminInput
    wallets?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutContributor_profileInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileUncheckedCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerUncheckedCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewUncheckedCreateNestedManyWithoutAdminInput
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutContributor_profileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContributor_profileInput, UserUncheckedCreateWithoutContributor_profileInput>
  }

  export type UserUpsertWithoutContributor_profileInput = {
    update: XOR<UserUpdateWithoutContributor_profileInput, UserUncheckedUpdateWithoutContributor_profileInput>
    create: XOR<UserCreateWithoutContributor_profileInput, UserUncheckedCreateWithoutContributor_profileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutContributor_profileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutContributor_profileInput, UserUncheckedUpdateWithoutContributor_profileInput>
  }

  export type UserUpdateWithoutContributor_profileInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUpdateManyWithoutAdminNestedInput
    wallets?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutContributor_profileInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUncheckedUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUncheckedUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUncheckedUpdateManyWithoutAdminNestedInput
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAdmin_profileInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewCreateNestedManyWithoutAdminInput
    wallets?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdmin_profileInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileUncheckedCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileUncheckedCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerUncheckedCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewUncheckedCreateNestedManyWithoutAdminInput
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdmin_profileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdmin_profileInput, UserUncheckedCreateWithoutAdmin_profileInput>
  }

  export type UserUpsertWithoutAdmin_profileInput = {
    update: XOR<UserUpdateWithoutAdmin_profileInput, UserUncheckedUpdateWithoutAdmin_profileInput>
    create: XOR<UserCreateWithoutAdmin_profileInput, UserUncheckedCreateWithoutAdmin_profileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdmin_profileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdmin_profileInput, UserUncheckedUpdateWithoutAdmin_profileInput>
  }

  export type UserUpdateWithoutAdmin_profileInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUpdateManyWithoutAdminNestedInput
    wallets?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdmin_profileInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUncheckedUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUncheckedUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUncheckedUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUncheckedUpdateManyWithoutAdminNestedInput
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWalletsInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutWalletsInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileUncheckedCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileUncheckedCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerUncheckedCreateNestedManyWithoutMaintainerInput
    project_reviews?: ProjectReviewUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutWalletsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
  }

  export type UserUpsertWithoutWalletsInput = {
    update: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type UserUpdateWithoutWalletsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUncheckedUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUncheckedUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUncheckedUpdateManyWithoutMaintainerNestedInput
    project_reviews?: ProjectReviewUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type RepositoryCreateWithoutProjectInput = {
    github_repo_id: bigint | number
    github_url: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RepositoryUncheckedCreateWithoutProjectInput = {
    github_repo_id: bigint | number
    github_url: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RepositoryCreateOrConnectWithoutProjectInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutProjectInput, RepositoryUncheckedCreateWithoutProjectInput>
  }

  export type RepositoryCreateManyProjectInputEnvelope = {
    data: RepositoryCreateManyProjectInput | RepositoryCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectMaintainerCreateWithoutProjectInput = {
    id?: string
    is_owner?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer: UserCreateNestedOneWithoutProject_maintainersInput
  }

  export type ProjectMaintainerUncheckedCreateWithoutProjectInput = {
    id?: string
    maintainer_id: string
    is_owner?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
  }

  export type ProjectMaintainerCreateOrConnectWithoutProjectInput = {
    where: ProjectMaintainerWhereUniqueInput
    create: XOR<ProjectMaintainerCreateWithoutProjectInput, ProjectMaintainerUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMaintainerCreateManyProjectInputEnvelope = {
    data: ProjectMaintainerCreateManyProjectInput | ProjectMaintainerCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectReviewCreateWithoutProjectInput = {
    review_id?: string
    action: $Enums.ReviewAction
    reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    admin: UserCreateNestedOneWithoutProject_reviewsInput
  }

  export type ProjectReviewUncheckedCreateWithoutProjectInput = {
    review_id?: string
    admin_id: string
    action: $Enums.ReviewAction
    reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectReviewCreateOrConnectWithoutProjectInput = {
    where: ProjectReviewWhereUniqueInput
    create: XOR<ProjectReviewCreateWithoutProjectInput, ProjectReviewUncheckedCreateWithoutProjectInput>
  }

  export type ProjectReviewCreateManyProjectInputEnvelope = {
    data: ProjectReviewCreateManyProjectInput | ProjectReviewCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type RepositoryUpsertWithWhereUniqueWithoutProjectInput = {
    where: RepositoryWhereUniqueInput
    update: XOR<RepositoryUpdateWithoutProjectInput, RepositoryUncheckedUpdateWithoutProjectInput>
    create: XOR<RepositoryCreateWithoutProjectInput, RepositoryUncheckedCreateWithoutProjectInput>
  }

  export type RepositoryUpdateWithWhereUniqueWithoutProjectInput = {
    where: RepositoryWhereUniqueInput
    data: XOR<RepositoryUpdateWithoutProjectInput, RepositoryUncheckedUpdateWithoutProjectInput>
  }

  export type RepositoryUpdateManyWithWhereWithoutProjectInput = {
    where: RepositoryScalarWhereInput
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyWithoutProjectInput>
  }

  export type RepositoryScalarWhereInput = {
    AND?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
    OR?: RepositoryScalarWhereInput[]
    NOT?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
    github_repo_id?: BigIntFilter<"Repository"> | bigint | number
    project_id?: UuidFilter<"Repository"> | string
    github_url?: StringFilter<"Repository"> | string
    name?: StringFilter<"Repository"> | string
    description?: StringNullableFilter<"Repository"> | string | null
    created_at?: DateTimeFilter<"Repository"> | Date | string
    updated_at?: DateTimeFilter<"Repository"> | Date | string
  }

  export type ProjectMaintainerUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectMaintainerWhereUniqueInput
    update: XOR<ProjectMaintainerUpdateWithoutProjectInput, ProjectMaintainerUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectMaintainerCreateWithoutProjectInput, ProjectMaintainerUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMaintainerUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectMaintainerWhereUniqueInput
    data: XOR<ProjectMaintainerUpdateWithoutProjectInput, ProjectMaintainerUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectMaintainerUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectMaintainerScalarWhereInput
    data: XOR<ProjectMaintainerUpdateManyMutationInput, ProjectMaintainerUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectReviewUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectReviewWhereUniqueInput
    update: XOR<ProjectReviewUpdateWithoutProjectInput, ProjectReviewUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectReviewCreateWithoutProjectInput, ProjectReviewUncheckedCreateWithoutProjectInput>
  }

  export type ProjectReviewUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectReviewWhereUniqueInput
    data: XOR<ProjectReviewUpdateWithoutProjectInput, ProjectReviewUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectReviewUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectReviewScalarWhereInput
    data: XOR<ProjectReviewUpdateManyMutationInput, ProjectReviewUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectCreateWithoutRepositoriesInput = {
    project_id?: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack?: ProjectCreatetech_stackInput | string[]
    category: $Enums.ProjectCategory
    status?: $Enums.ProjectStatus
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    reviewed_at?: Date | string | null
    maintainers?: ProjectMaintainerCreateNestedManyWithoutProjectInput
    reviews?: ProjectReviewCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutRepositoriesInput = {
    project_id?: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack?: ProjectCreatetech_stackInput | string[]
    category: $Enums.ProjectCategory
    status?: $Enums.ProjectStatus
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    reviewed_at?: Date | string | null
    maintainers?: ProjectMaintainerUncheckedCreateNestedManyWithoutProjectInput
    reviews?: ProjectReviewUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutRepositoriesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutRepositoriesInput, ProjectUncheckedCreateWithoutRepositoriesInput>
  }

  export type ProjectUpsertWithoutRepositoriesInput = {
    update: XOR<ProjectUpdateWithoutRepositoriesInput, ProjectUncheckedUpdateWithoutRepositoriesInput>
    create: XOR<ProjectCreateWithoutRepositoriesInput, ProjectUncheckedCreateWithoutRepositoriesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutRepositoriesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutRepositoriesInput, ProjectUncheckedUpdateWithoutRepositoriesInput>
  }

  export type ProjectUpdateWithoutRepositoriesInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maintainers?: ProjectMaintainerUpdateManyWithoutProjectNestedInput
    reviews?: ProjectReviewUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutRepositoriesInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    maintainers?: ProjectMaintainerUncheckedUpdateManyWithoutProjectNestedInput
    reviews?: ProjectReviewUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutMaintainersInput = {
    project_id?: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack?: ProjectCreatetech_stackInput | string[]
    category: $Enums.ProjectCategory
    status?: $Enums.ProjectStatus
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    reviewed_at?: Date | string | null
    repositories?: RepositoryCreateNestedManyWithoutProjectInput
    reviews?: ProjectReviewCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutMaintainersInput = {
    project_id?: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack?: ProjectCreatetech_stackInput | string[]
    category: $Enums.ProjectCategory
    status?: $Enums.ProjectStatus
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    reviewed_at?: Date | string | null
    repositories?: RepositoryUncheckedCreateNestedManyWithoutProjectInput
    reviews?: ProjectReviewUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutMaintainersInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMaintainersInput, ProjectUncheckedCreateWithoutMaintainersInput>
  }

  export type UserCreateWithoutProject_maintainersInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileCreateNestedOneWithoutUserInput
    project_reviews?: ProjectReviewCreateNestedManyWithoutAdminInput
    wallets?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProject_maintainersInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileUncheckedCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileUncheckedCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    project_reviews?: ProjectReviewUncheckedCreateNestedManyWithoutAdminInput
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProject_maintainersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProject_maintainersInput, UserUncheckedCreateWithoutProject_maintainersInput>
  }

  export type ProjectUpsertWithoutMaintainersInput = {
    update: XOR<ProjectUpdateWithoutMaintainersInput, ProjectUncheckedUpdateWithoutMaintainersInput>
    create: XOR<ProjectCreateWithoutMaintainersInput, ProjectUncheckedCreateWithoutMaintainersInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutMaintainersInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutMaintainersInput, ProjectUncheckedUpdateWithoutMaintainersInput>
  }

  export type ProjectUpdateWithoutMaintainersInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repositories?: RepositoryUpdateManyWithoutProjectNestedInput
    reviews?: ProjectReviewUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMaintainersInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repositories?: RepositoryUncheckedUpdateManyWithoutProjectNestedInput
    reviews?: ProjectReviewUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutProject_maintainersInput = {
    update: XOR<UserUpdateWithoutProject_maintainersInput, UserUncheckedUpdateWithoutProject_maintainersInput>
    create: XOR<UserCreateWithoutProject_maintainersInput, UserUncheckedCreateWithoutProject_maintainersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProject_maintainersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProject_maintainersInput, UserUncheckedUpdateWithoutProject_maintainersInput>
  }

  export type UserUpdateWithoutProject_maintainersInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUpdateOneWithoutUserNestedInput
    project_reviews?: ProjectReviewUpdateManyWithoutAdminNestedInput
    wallets?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProject_maintainersInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUncheckedUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUncheckedUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    project_reviews?: ProjectReviewUncheckedUpdateManyWithoutAdminNestedInput
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectCreateWithoutReviewsInput = {
    project_id?: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack?: ProjectCreatetech_stackInput | string[]
    category: $Enums.ProjectCategory
    status?: $Enums.ProjectStatus
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    reviewed_at?: Date | string | null
    repositories?: RepositoryCreateNestedManyWithoutProjectInput
    maintainers?: ProjectMaintainerCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutReviewsInput = {
    project_id?: string
    name: string
    github_handle: string
    short_description: string
    description: string
    tech_stack?: ProjectCreatetech_stackInput | string[]
    category: $Enums.ProjectCategory
    status?: $Enums.ProjectStatus
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    reviewed_at?: Date | string | null
    repositories?: RepositoryUncheckedCreateNestedManyWithoutProjectInput
    maintainers?: ProjectMaintainerUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutReviewsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutReviewsInput, ProjectUncheckedCreateWithoutReviewsInput>
  }

  export type UserCreateWithoutProject_reviewsInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerCreateNestedManyWithoutMaintainerInput
    wallets?: WalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProject_reviewsInput = {
    user_id?: string
    email: string
    username?: string | null
    avatar_url?: string | null
    roles?: UserCreaterolesInput | $Enums.UserRole[]
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
    maintainer_profile?: MaintainerProfileUncheckedCreateNestedOneWithoutUserInput
    contributor_profile?: ContributorProfileUncheckedCreateNestedOneWithoutUserInput
    admin_profile?: AdminProfileUncheckedCreateNestedOneWithoutUserInput
    project_maintainers?: ProjectMaintainerUncheckedCreateNestedManyWithoutMaintainerInput
    wallets?: WalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProject_reviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProject_reviewsInput, UserUncheckedCreateWithoutProject_reviewsInput>
  }

  export type ProjectUpsertWithoutReviewsInput = {
    update: XOR<ProjectUpdateWithoutReviewsInput, ProjectUncheckedUpdateWithoutReviewsInput>
    create: XOR<ProjectCreateWithoutReviewsInput, ProjectUncheckedCreateWithoutReviewsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutReviewsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutReviewsInput, ProjectUncheckedUpdateWithoutReviewsInput>
  }

  export type ProjectUpdateWithoutReviewsInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repositories?: RepositoryUpdateManyWithoutProjectNestedInput
    maintainers?: ProjectMaintainerUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutReviewsInput = {
    project_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    github_handle?: StringFieldUpdateOperationsInput | string
    short_description?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tech_stack?: ProjectUpdatetech_stackInput | string[]
    category?: EnumProjectCategoryFieldUpdateOperationsInput | $Enums.ProjectCategory
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repositories?: RepositoryUncheckedUpdateManyWithoutProjectNestedInput
    maintainers?: ProjectMaintainerUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutProject_reviewsInput = {
    update: XOR<UserUpdateWithoutProject_reviewsInput, UserUncheckedUpdateWithoutProject_reviewsInput>
    create: XOR<UserCreateWithoutProject_reviewsInput, UserUncheckedCreateWithoutProject_reviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProject_reviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProject_reviewsInput, UserUncheckedUpdateWithoutProject_reviewsInput>
  }

  export type UserUpdateWithoutProject_reviewsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUpdateManyWithoutMaintainerNestedInput
    wallets?: WalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProject_reviewsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.UserRole[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer_profile?: MaintainerProfileUncheckedUpdateOneWithoutUserNestedInput
    contributor_profile?: ContributorProfileUncheckedUpdateOneWithoutUserNestedInput
    admin_profile?: AdminProfileUncheckedUpdateOneWithoutUserNestedInput
    project_maintainers?: ProjectMaintainerUncheckedUpdateManyWithoutMaintainerNestedInput
    wallets?: WalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectMaintainerCreateManyMaintainerInput = {
    id?: string
    project_id: string
    is_owner?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
  }

  export type ProjectReviewCreateManyAdminInput = {
    review_id?: string
    project_id: string
    action: $Enums.ReviewAction
    reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WalletCreateManyUserInput = {
    wallet_id?: string
    address: string
    is_primary?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectMaintainerUpdateWithoutMaintainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    project?: ProjectUpdateOneRequiredWithoutMaintainersNestedInput
  }

  export type ProjectMaintainerUncheckedUpdateWithoutMaintainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectMaintainerUncheckedUpdateManyWithoutMaintainerInput = {
    id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectReviewUpdateWithoutAdminInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ProjectReviewUncheckedUpdateWithoutAdminInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectReviewUncheckedUpdateManyWithoutAdminInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUpdateWithoutUserInput = {
    wallet_id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    wallet_id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyWithoutUserInput = {
    wallet_id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    is_primary?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryCreateManyProjectInput = {
    github_repo_id: bigint | number
    github_url: string
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectMaintainerCreateManyProjectInput = {
    id?: string
    maintainer_id: string
    is_owner?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_active?: boolean
  }

  export type ProjectReviewCreateManyProjectInput = {
    review_id?: string
    admin_id: string
    action: $Enums.ReviewAction
    reason?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RepositoryUpdateWithoutProjectInput = {
    github_repo_id?: BigIntFieldUpdateOperationsInput | bigint | number
    github_url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryUncheckedUpdateWithoutProjectInput = {
    github_repo_id?: BigIntFieldUpdateOperationsInput | bigint | number
    github_url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryUncheckedUpdateManyWithoutProjectInput = {
    github_repo_id?: BigIntFieldUpdateOperationsInput | bigint | number
    github_url?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMaintainerUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    maintainer?: UserUpdateOneRequiredWithoutProject_maintainersNestedInput
  }

  export type ProjectMaintainerUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    maintainer_id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectMaintainerUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    maintainer_id?: StringFieldUpdateOperationsInput | string
    is_owner?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectReviewUpdateWithoutProjectInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutProject_reviewsNestedInput
  }

  export type ProjectReviewUncheckedUpdateWithoutProjectInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectReviewUncheckedUpdateManyWithoutProjectInput = {
    review_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    action?: EnumReviewActionFieldUpdateOperationsInput | $Enums.ReviewAction
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}