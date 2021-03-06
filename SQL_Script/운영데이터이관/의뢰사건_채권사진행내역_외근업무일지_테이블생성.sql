
DROP INDEX PK_외근업무일지;



DROP TABLE 외근업무일지 CASCADE CONSTRAINTS PURGE;



DROP INDEX PK_채권사진행내역;



DROP TABLE 채권사진행내역 CASCADE CONSTRAINTS PURGE;



DROP INDEX PK_의뢰사건;



DROP TABLE 의뢰사건 CASCADE CONSTRAINTS PURGE;



CREATE TABLE 외근업무일지
(
    ID                   INTEGER NOT NULL ,
    채권사               VARCHAR2(255) NULL ,
    접수일               VARCHAR(255) NULL ,
    접수직원             VARCHAR2(255) NULL ,
    나열순서             VARCHAR2(255) NULL ,
    고객코드             INTEGER NULL ,
    고객이름             VARCHAR2(255) NULL ,
    주민등록번호         VARCHAR2(255) NULL ,
    특이사항             VARCHAR2(2000) NULL ,
    진행상황             VARCHAR2(255) NULL ,
    진행순서             VARCHAR2(255) NULL ,
    출력순서             VARCHAR2(255) NULL ,
    수수료               VARCHAR2(255) NULL ,
    처리결과             VARCHAR2(200) NULL ,
    접수일자             VARCHAR2(255) NULL ,
    발급예정일           VARCHAR2(255) NULL ,
    확인예정자           VARCHAR2(255) NULL 
);



CREATE UNIQUE INDEX PK_외근업무일지 ON 외근업무일지
(ID   ASC);



ALTER TABLE 외근업무일지
    ADD CONSTRAINT  PK_외근업무일지 PRIMARY KEY (ID);



CREATE TABLE 의뢰사건
(
    고객코드             INTEGER NOT NULL ,
    제휴사코드           INTEGER NULL ,
    제휴사사건담당자     VARCHAR2(255) NULL ,
    이름                 VARCHAR2(255) NULL ,
    주민등록번호         VARCHAR2(255) NULL ,
    전화번호             VARCHAR2(255) NULL ,
    주소                 NVARCHAR2(255) NULL ,
    특이사항             NVARCHAR2(2000) NULL ,
    시작일               VARCHAR2(255) NULL ,
    마감일               VARCHAR2(255) NULL ,
    은행수수료           VARCHAR2(255) NULL ,
    대행수수료           VARCHAR2(255) NULL ,
    총대행수수료         VARCHAR2(255) NULL ,
    스캔                 VARCHAR2(255) NULL ,
    비용청구             VARCHAR2(255) NULL ,
    서류담당             VARCHAR2(255) NULL ,
    담당이               VARCHAR2(255) NULL ,
    진행내역             VARCHAR2(2000) NULL ,
    신용                 VARCHAR2(255) DEFAULT  0  NULL ,
    신용조회             VARCHAR2(255) NULL ,
    부채증명             VARCHAR2(255) NULL ,
    내용증명             VARCHAR2(255) NULL ,
    카드거래             VARCHAR2(255) NULL ,
    통장거래             VARCHAR2(255) NULL ,
    숫자코드             VARCHAR2(255) NULL ,
    미발급건             NVARCHAR2(2000) NULL ,
    사건구분             VARCHAR2(255) NULL 
);



CREATE UNIQUE INDEX PK_의뢰사건 ON 의뢰사건
(고객코드   ASC);



ALTER TABLE 의뢰사건
    ADD CONSTRAINT  PK_의뢰사건 PRIMARY KEY (고객코드);



CREATE TABLE 채권사진행내역
(
    진행코드             INTEGER NOT NULL ,
    고객코드             INTEGER NULL ,
    의뢰채권사           VARCHAR2(255) NULL ,
    비고일               VARCHAR2(255) NULL ,
    진행이               VARCHAR2(255) NULL ,
    비고이               VARCHAR2(255) NULL ,
    진행삼               VARCHAR2(255) NULL ,
    비고삼               VARCHAR2(255) NULL ,
    출력순서             VARCHAR2(255) NULL ,
    진행특이사항         VARCHAR2(2550) NULL ,
    부채증명             VARCHAR2(255) DEFAULT  0  NULL ,
    내용증명             VARCHAR2(255) DEFAULT  0  NULL ,
    카드거래             VARCHAR2(255) DEFAULT  0  NULL ,
    통장거래             VARCHAR2(255) DEFAULT  0  NULL ,
    신용조회             VARCHAR2(255) DEFAULT  0  NULL ,
    은행수수료           VARCHAR2(255) DEFAULT  0  NULL ,
    대행수수료           VARCHAR2(255) DEFAULT  0  NULL ,
    마감출력             VARCHAR2(255) DEFAULT  -1  NULL ,
    진행순서             VARCHAR2(255) NULL ,
    증가수치             VARCHAR2(255) DEFAULT  1000  NULL ,
    마감순서             VARCHAR2(255) DEFAULT  1  NULL ,
    연속                 VARCHAR2(255) DEFAULT  0  NULL ,
    확장                 VARCHAR2(255) NULL ,
    진행이밑             VARCHAR2(255) NULL ,
    진행삼밑             VARCHAR2(255) NULL ,
    카드거래출력         VARCHAR2(255) DEFAULT  0  NULL ,
    통장거래출력         VARCHAR2(255) DEFAULT  0  NULL ,
    카드거래비고         VARCHAR2(255) NULL ,
    통장거래비고         VARCHAR2(255) NULL ,
    서류접수관리채권사   VARCHAR2(255) NULL ,
    업무일지채권사       VARCHAR2(255) NULL ,
    의뢰채권사출력일     VARCHAR2(255) NULL ,
    진행이출력일         VARCHAR2(255) NULL ,
    진행삼출력일         VARCHAR2(255) NULL 
);



CREATE UNIQUE INDEX PK_채권사진행내역 ON 채권사진행내역
(진행코드   ASC);



ALTER TABLE 채권사진행내역
    ADD CONSTRAINT  PK_채권사진행내역 PRIMARY KEY (진행코드);





COMMENT ON TABLE 외근업무일지 IS '외근업무일지';

COMMENT ON COLUMN 외근업무일지.ID IS 'ID';
COMMENT ON COLUMN 외근업무일지.채권사 IS '채권사';
COMMENT ON COLUMN 외근업무일지.접수일 IS '접수일';
COMMENT ON COLUMN 외근업무일지.접수직원 IS '접수직원';
COMMENT ON COLUMN 외근업무일지.나열순서 IS '나열순서';
COMMENT ON COLUMN 외근업무일지.고객코드 IS '고객코드';
COMMENT ON COLUMN 외근업무일지.고객이름 IS '고객이름';
COMMENT ON COLUMN 외근업무일지.주민등록번호 IS '주민등록번호';
COMMENT ON COLUMN 외근업무일지.특이사항 IS '특이사항';
COMMENT ON COLUMN 외근업무일지.진행상황 IS '진행상황';
COMMENT ON COLUMN 외근업무일지.진행순서 IS '진행순서';
COMMENT ON COLUMN 외근업무일지.출력순서 IS '출력순서';
COMMENT ON COLUMN 외근업무일지.수수료 IS '수수료';
COMMENT ON COLUMN 외근업무일지.처리결과 IS '처리결과';
COMMENT ON COLUMN 외근업무일지.접수일자 IS '접수일자';
COMMENT ON COLUMN 외근업무일지.발급예정일 IS '발급예정일';
COMMENT ON COLUMN 외근업무일지.확인예정자 IS '확인예정자';

COMMENT ON TABLE 의뢰사건 IS '의뢰사건';

COMMENT ON COLUMN 의뢰사건.고객코드 IS '고객코드';
COMMENT ON COLUMN 의뢰사건.제휴사코드 IS '제휴사코드';
COMMENT ON COLUMN 의뢰사건.제휴사사건담당자 IS '제휴사사건담당자';
COMMENT ON COLUMN 의뢰사건.이름 IS '이름';
COMMENT ON COLUMN 의뢰사건.주민등록번호 IS '주민등록번호';
COMMENT ON COLUMN 의뢰사건.전화번호 IS '전화번호';
COMMENT ON COLUMN 의뢰사건.주소 IS '주소';
COMMENT ON COLUMN 의뢰사건.특이사항 IS '특이사항';
COMMENT ON COLUMN 의뢰사건.시작일 IS '시작일';
COMMENT ON COLUMN 의뢰사건.마감일 IS '마감일';
COMMENT ON COLUMN 의뢰사건.은행수수료 IS '은행수수료';
COMMENT ON COLUMN 의뢰사건.대행수수료 IS '대행수수료';
COMMENT ON COLUMN 의뢰사건.총대행수수료 IS '총대행수수료';
COMMENT ON COLUMN 의뢰사건.스캔 IS '스캔';
COMMENT ON COLUMN 의뢰사건.비용청구 IS '비용청구';
COMMENT ON COLUMN 의뢰사건.서류담당 IS '서류담당';
COMMENT ON COLUMN 의뢰사건.담당이 IS '담당이';
COMMENT ON COLUMN 의뢰사건.진행내역 IS '진행내역';
COMMENT ON COLUMN 의뢰사건.신용 IS '신용';
COMMENT ON COLUMN 의뢰사건.신용조회 IS '신용조회';
COMMENT ON COLUMN 의뢰사건.부채증명 IS '부채증명';
COMMENT ON COLUMN 의뢰사건.내용증명 IS '내용증명';
COMMENT ON COLUMN 의뢰사건.카드거래 IS '카드거래';
COMMENT ON COLUMN 의뢰사건.통장거래 IS '통장거래';
COMMENT ON COLUMN 의뢰사건.숫자코드 IS '숫자코드';
COMMENT ON COLUMN 의뢰사건.미발급건 IS '미발급건';
COMMENT ON COLUMN 의뢰사건.사건구분 IS '사건구분';

COMMENT ON TABLE 채권사진행내역 IS '채권사진행내역';

COMMENT ON COLUMN 채권사진행내역.진행코드 IS '진행코드';
COMMENT ON COLUMN 채권사진행내역.고객코드 IS '고객코드';
COMMENT ON COLUMN 채권사진행내역.의뢰채권사 IS '의뢰채권사';
COMMENT ON COLUMN 채권사진행내역.비고일 IS '비고일';
COMMENT ON COLUMN 채권사진행내역.진행이 IS '진행이';
COMMENT ON COLUMN 채권사진행내역.비고이 IS '비고이';
COMMENT ON COLUMN 채권사진행내역.진행삼 IS '진행삼';
COMMENT ON COLUMN 채권사진행내역.비고삼 IS '비고삼';
COMMENT ON COLUMN 채권사진행내역.출력순서 IS '출력순서';
COMMENT ON COLUMN 채권사진행내역.진행특이사항 IS '진행특이사항';
COMMENT ON COLUMN 채권사진행내역.부채증명 IS '부채증명';
COMMENT ON COLUMN 채권사진행내역.내용증명 IS '내용증명';
COMMENT ON COLUMN 채권사진행내역.카드거래 IS '카드거래';
COMMENT ON COLUMN 채권사진행내역.통장거래 IS '통장거래';
COMMENT ON COLUMN 채권사진행내역.신용조회 IS '신용조회';
COMMENT ON COLUMN 채권사진행내역.은행수수료 IS '은행수수료';
COMMENT ON COLUMN 채권사진행내역.대행수수료 IS '대행수수료';
COMMENT ON COLUMN 채권사진행내역.마감출력 IS '마감출력';
COMMENT ON COLUMN 채권사진행내역.진행순서 IS '진행순서';
COMMENT ON COLUMN 채권사진행내역.증가수치 IS '증가수치';
COMMENT ON COLUMN 채권사진행내역.마감순서 IS '마감순서';
COMMENT ON COLUMN 채권사진행내역.연속 IS '연속';
COMMENT ON COLUMN 채권사진행내역.확장 IS '확장';
COMMENT ON COLUMN 채권사진행내역.진행이밑 IS '진행이밑';
COMMENT ON COLUMN 채권사진행내역.진행삼밑 IS '진행삼밑';
COMMENT ON COLUMN 채권사진행내역.카드거래출력 IS '카드거래출력';
COMMENT ON COLUMN 채권사진행내역.통장거래출력 IS '통장거래출력';
COMMENT ON COLUMN 채권사진행내역.카드거래비고 IS '카드거래비고';
COMMENT ON COLUMN 채권사진행내역.통장거래비고 IS '통장거래비고';
COMMENT ON COLUMN 채권사진행내역.서류접수관리채권사 IS '서류접수관리채권사';
COMMENT ON COLUMN 채권사진행내역.업무일지채권사 IS '업무일지채권사';
COMMENT ON COLUMN 채권사진행내역.의뢰채권사출력일 IS '의뢰채권사출력일';
COMMENT ON COLUMN 채권사진행내역.진행이출력일 IS '진행이출력일';
COMMENT ON COLUMN 채권사진행내역.진행삼출력일 IS '진행삼출력일';



