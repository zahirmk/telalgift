PGDMP     .    1            	    |            telal    12.4    12.4 &    /           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            0           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            1           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            2           1262    35158    telal    DATABASE     �   CREATE DATABASE telal WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United Kingdom.1252' LC_CTYPE = 'English_United Kingdom.1252';
    DROP DATABASE telal;
                openpg    false            �            1259    35161 	   ordmaster    TABLE       CREATE TABLE public.ordmaster (
    ordbranch character varying(20),
    ordcustomer character varying(250) NOT NULL,
    orddate date NOT NULL,
    ordid integer NOT NULL,
    ordmobile character varying(20) NOT NULL,
    ordemail character varying(100)
);
    DROP TABLE public.ordmaster;
       public         heap    openpg    false            �            1259    35159    OrdMaster_OrdID_seq    SEQUENCE     �   CREATE SEQUENCE public."OrdMaster_OrdID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."OrdMaster_OrdID_seq";
       public          openpg    false    203            3           0    0    OrdMaster_OrdID_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."OrdMaster_OrdID_seq" OWNED BY public.ordmaster.ordid;
          public          openpg    false    202            �            1259    35169    orderdetail    TABLE     4  CREATE TABLE public.orderdetail (
    detid integer NOT NULL,
    detordid numeric NOT NULL,
    detpriitem character varying(100) NOT NULL,
    detgiftitem character varying(100) NOT NULL,
    detqty numeric(10,0) NOT NULL,
    detcruser character varying(100),
    detcrdate timestamp without time zone
);
    DROP TABLE public.orderdetail;
       public         heap    openpg    false            �            1259    35167    OrderDetail_DetID_seq    SEQUENCE     �   CREATE SEQUENCE public."OrderDetail_DetID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."OrderDetail_DetID_seq";
       public          openpg    false    205            4           0    0    OrderDetail_DetID_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."OrderDetail_DetID_seq" OWNED BY public.orderdetail.detid;
          public          openpg    false    204            �            1259    35223    giftitem    TABLE     g   CREATE TABLE public.giftitem (
    giftid integer NOT NULL,
    giftitemname character varying(100)
);
    DROP TABLE public.giftitem;
       public         heap    openpg    false            �            1259    35221    giftitem_giftid_seq    SEQUENCE     �   CREATE SEQUENCE public.giftitem_giftid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.giftitem_giftid_seq;
       public          openpg    false    211            5           0    0    giftitem_giftid_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.giftitem_giftid_seq OWNED BY public.giftitem.giftid;
          public          openpg    false    210            �            1259    35216    primaryitem    TABLE     f   CREATE TABLE public.primaryitem (
    itemid integer NOT NULL,
    itemname character varying(100)
);
    DROP TABLE public.primaryitem;
       public         heap    openpg    false            �            1259    35214    primaryitem_itemid_seq    SEQUENCE     �   CREATE SEQUENCE public.primaryitem_itemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.primaryitem_itemid_seq;
       public          openpg    false    209            6           0    0    primaryitem_itemid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.primaryitem_itemid_seq OWNED BY public.primaryitem.itemid;
          public          openpg    false    208            �            1259    35196    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    "user" character varying(100) NOT NULL,
    email character varying(100),
    userid character varying(20) NOT NULL,
    pwd character varying(20) NOT NULL,
    branch character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    openpg    false            �            1259    35194    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          openpg    false    207            7           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          openpg    false    206            �
           2604    35226    giftitem giftid    DEFAULT     r   ALTER TABLE ONLY public.giftitem ALTER COLUMN giftid SET DEFAULT nextval('public.giftitem_giftid_seq'::regclass);
 >   ALTER TABLE public.giftitem ALTER COLUMN giftid DROP DEFAULT;
       public          openpg    false    211    210    211            �
           2604    35172    orderdetail detid    DEFAULT     x   ALTER TABLE ONLY public.orderdetail ALTER COLUMN detid SET DEFAULT nextval('public."OrderDetail_DetID_seq"'::regclass);
 @   ALTER TABLE public.orderdetail ALTER COLUMN detid DROP DEFAULT;
       public          openpg    false    205    204    205            �
           2604    35164    ordmaster ordid    DEFAULT     t   ALTER TABLE ONLY public.ordmaster ALTER COLUMN ordid SET DEFAULT nextval('public."OrdMaster_OrdID_seq"'::regclass);
 >   ALTER TABLE public.ordmaster ALTER COLUMN ordid DROP DEFAULT;
       public          openpg    false    202    203    203            �
           2604    35219    primaryitem itemid    DEFAULT     x   ALTER TABLE ONLY public.primaryitem ALTER COLUMN itemid SET DEFAULT nextval('public.primaryitem_itemid_seq'::regclass);
 A   ALTER TABLE public.primaryitem ALTER COLUMN itemid DROP DEFAULT;
       public          openpg    false    208    209    209            �
           2604    35199    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          openpg    false    207    206    207            ,          0    35223    giftitem 
   TABLE DATA           8   COPY public.giftitem (giftid, giftitemname) FROM stdin;
    public          openpg    false    211   +)       &          0    35169    orderdetail 
   TABLE DATA           m   COPY public.orderdetail (detid, detordid, detpriitem, detgiftitem, detqty, detcruser, detcrdate) FROM stdin;
    public          openpg    false    205   i)       $          0    35161 	   ordmaster 
   TABLE DATA           `   COPY public.ordmaster (ordbranch, ordcustomer, orddate, ordid, ordmobile, ordemail) FROM stdin;
    public          openpg    false    203   f*       *          0    35216    primaryitem 
   TABLE DATA           7   COPY public.primaryitem (itemid, itemname) FROM stdin;
    public          openpg    false    209   �+       (          0    35196    users 
   TABLE DATA           G   COPY public.users (id, "user", email, userid, pwd, branch) FROM stdin;
    public          openpg    false    207   C,       8           0    0    OrdMaster_OrdID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."OrdMaster_OrdID_seq"', 57, true);
          public          openpg    false    202            9           0    0    OrderDetail_DetID_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."OrderDetail_DetID_seq"', 41, true);
          public          openpg    false    204            :           0    0    giftitem_giftid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.giftitem_giftid_seq', 1, false);
          public          openpg    false    210            ;           0    0    primaryitem_itemid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.primaryitem_itemid_seq', 1, false);
          public          openpg    false    208            <           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          openpg    false    206            �
           2606    35166    ordmaster OrdMaster_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.ordmaster
    ADD CONSTRAINT "OrdMaster_pkey" PRIMARY KEY (ordid);
 D   ALTER TABLE ONLY public.ordmaster DROP CONSTRAINT "OrdMaster_pkey";
       public            openpg    false    203            �
           2606    35177    orderdetail OrderDetail_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.orderdetail
    ADD CONSTRAINT "OrderDetail_pkey" PRIMARY KEY (detid);
 H   ALTER TABLE ONLY public.orderdetail DROP CONSTRAINT "OrderDetail_pkey";
       public            openpg    false    205            �
           2606    35228    giftitem giftitem_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.giftitem
    ADD CONSTRAINT giftitem_pkey PRIMARY KEY (giftid);
 @   ALTER TABLE ONLY public.giftitem DROP CONSTRAINT giftitem_pkey;
       public            openpg    false    211            �
           2606    35201    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            openpg    false    207            ,   .   x�3�pr�u�2����s
�2��p��2�tv������ ���      &   �   x�u�Kn�0�χ)$����(@Q�	�����R�����C����=N�%�x�t]n�)�e�pNlvtP������Ǆ��R��U܃݉94hk:&\R��?�h݂����X���K�����~�&o���w�&_�Ӽj9�P�*R�?�r��,25��Eb�)qor���zj����,�@��F�C�lbXY��"�c9��5֦*�{�|>H	x.�x�Y����~r3��      $   �  x���Mo� ���)�/�B魏N�h���0�1:�.����×mMt� ����+��T��$#P��v�P"BC���=�gi��*[��@�O���LA��}{���'�%��)����[SV�]�ۉ>� � u����S({��ux	J�~u�B�0�Ʀ��&.˝c�P��&O�v@^�1B��0��������R��	����$%�'M��+Zz�Y��/��-6�������ua�y�z�,�gs�)ń3)m������{}��/��l�}���j�:,�؋��}�1�fͼ-|�.1�\JJO2��w�aȼ�fs�=����U�*��^	��\��u���.��Y؃��#m��!�����tZ��7���      *   :   x�3��v�s	r�2�tuw��2�t	r�2�v��2�t��Qwu����� ,
�      (   T   x�3�J��,RpLJ)��I��r��s3s���s!"��Ș�?71O��ˈ38#17/�$C����LF��Rp�F\1z\\\ ;R&     