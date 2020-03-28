package co.util;

import java.io.Serializable;

/**
 * PageSet에 관련된 유틸리티
 *
 * @author reset01 백승윤
 */
public class PageSet implements Serializable{

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private int defaultCurrentPage  = 1;

    /* 한 페이지 row의 갯수는 10개이다. */
    private int defaultListSize = 10;

    /* 페이지사이즈는 10개, 10보다 많을 경우 "이전, 다음"으로 표시 */
    private int defaultPageSize = 10;

    /* 현재 페이지 */
    private int currentPage = -1;

    /* 전체 행(ROW)의 수 */
    private int totalSize = 0;

    /* 한 페이지에 보여줄 행(ROW)의 수 */
    @SuppressWarnings("unused")
	private int pageSize;

    /* 한 페이지에 보여줄 리스트(row) 수 */
    private int listSize = defaultListSize;



    /**
     * SQL 2000 Server에서 TOP n의 값을 리턴한다.
     * @param curPage - list.jsp에서 넘어 온 파라미터 값
     * @return TOP n에 적용될 n의 정수 값
     */
    public int calculateStartScope(int curPage) {
        int defaultTopScope = 1;
        if (curPage > 0) {
            return (this.listSize * (curPage - 1)) + defaultTopScope;
        } else {
            return defaultTopScope;
        }
    }
    
    public int calculateEndScope(int startPage) {
        int defaultTopScope = 1;
        return (startPage - defaultTopScope) + this.listSize;
    }
    
    /**
     * 현재 페이지에서 가장 큰 행 번호(ROW NO)를 리턴한다.
     *
     * @return maxRowNoInCurrentPage
     */
    public int getMaxRowNoInCurrentPage() {
        return getTotalSize() - getListSize() * (getCurrentPage() - 1);
    }

    /**
     * 현재 페이지에서 가장 작은 행 번호(ROW NO)를 리턴한다.
     *
     * @return minRowNoInCurrentPage
     */
    public int getMinRowNoInCurrentPage() {
        return getStartRowIndex() + 1;
    }

    /**
     * 한 화면의 페이지 수 리턴한다.
     * 예) [1][2][3][4][5]
     *
     * @return defaultPageSize
     */
    public int getPageSize() {
        return defaultPageSize;
    }

    /**
     * 한 화면의 페이지 수 설정한다.
     * 예) [1][2][3][4][5]
     */
    public void setPageSize(int pageSize) {
        defaultPageSize = pageSize;
    }

    /**
     * 현재 페이지 번호를 리턴한다.
     */
    public int getCurrentPage() {
        if (this.currentPage > 0) {
            return currentPage;
        } else {
            return defaultCurrentPage;
        }
    }

    /**
     * 현재 페이지 번호를 설정한다.
     *
     * @param currentPage - 현재 페이지 번호
     */
    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    /**
     * 한 페이지에서 보여줄 리스트(ROW) 사이즈를 리턴한다.
     */
    public int getListSize() {
        return listSize;
    }

    /**
     * 한 페이지에서 보여줄 리스트(ROW) 사이즈를 설정한다.
     *
     * @param listSize - 리스트(ROW) 사이즈
     */
    public void setListSize(int listSize) {
    if (listSize <= 0) {
            listSize = defaultListSize;
        }
        this.listSize = listSize;
    }

    /**
     * 전체 로우(ROW) 카운드를 리턴한다.
     *
     * @return totalSize
     */
    public int getTotalSize() {
        return totalSize;
    }

    /**
     * 전체 Row 카운트를 설정한다.
     *
     * @param totalSize
     */
    public void setTotalSize(int totalSize) {
        this.totalSize = totalSize;
    }

    /**
     * 페이지의 수를 리턴한다.
     *
     * @return pages
     */
    public int getTotalPageByPage() {
        int size = getTotalSize();
        int pageSize = getListSize();
        int pages = size / pageSize;
        if ((size % pageSize) > 0) {
            pages++;
        }
        return pages;
    }

    /**
     * 현재 게시물의 시작번호를 리턴한다.
     *
     * @return startRowIndex
     */
    public int getStartRowIndex() {
        return getListSize()*(getCurrentPage()-1);
    }

    /**
     * 현재 게시물의 끝번호를 리턴한다.
     *
     * @return endRowIndex
     */
    public int getEndRowIndex() {
        return getListSize()*getCurrentPage()+1;
    }

    /**
     * 시작 페이지 번호를 리턴한다.
     *
     * @return indexOfStartPage
     */
    private int getIndexOfStartPage() {
        return ((getCurrentPage()-1)/getPageSize())*getPageSize()+1;
    }

    /**
     * 마지막 페이지 번호를 리턴한다.
     *
     * @return indexOfEndPage
     */
    private int getIndexOfEndPage() {
        return (((getIndexOfStartPage()-1)+getPageSize()) / getPageSize()) * getPageSize();
    }

    // 예전버전
    public String pageList(String list_url) {

        // 추가한 부분 : 2005.04.23.12:09
        String token = "&";
        if (list_url.indexOf("?") == -1)
            token = "?";

        StringBuffer pageBuffer = new StringBuffer();

        int startOfPage;    // 화면 하단에 보여질 시작 페이지 번호
        int endOfPage;      // 화면 하단에 보여질 마지막 페이지 번호
        int movoToPage;     // 이동하고자 하는 페이지 번호

        //시작 페이지 번호 구하기
        startOfPage = getIndexOfStartPage();

        //마지막 페이지 번호 구하기
        endOfPage = getIndexOfEndPage();

        // 총 페이지 수가 계산된 마지막페이지 번호보다 작을경우
        // 총 페이지 수가 마지막페이지 번호가 됨
        if (getTotalPageByPage() <= endOfPage) {
            endOfPage = getTotalPageByPage();
        }

        pageBuffer.append("<a href='"+list_url+token+"currentPage="+startOfPage+"'>");
        pageBuffer.append("[처음]</a>");
        pageBuffer.append("&nbsp;&nbsp;");

        // 첫번째 페이지 인덱스 화면이 아닌 경우
        if (getCurrentPage() > getPageSize()) {
            movoToPage = startOfPage - getPageSize();
            pageBuffer.append("<a href='"+list_url+token+"currentPage="+movoToPage+"'>");
        }
        pageBuffer.append("[이전10개]</a>");
        pageBuffer.append("&nbsp;&nbsp;");

        // 시작페이지 번호부터 마지막페이지 번호까지 화면에 표시
        movoToPage = startOfPage;
        while (movoToPage <= endOfPage) {
            if (movoToPage == getCurrentPage()) {
                pageBuffer.append("&nbsp;<b><font size='+1' color='#666666'>"+getCurrentPage()+"</font></b>&nbsp;");
            } else {
                pageBuffer.append("<a href='"+list_url+token+"currentPage="+movoToPage+"'>"+movoToPage+"</a>");
            }
            movoToPage++;
        }
        pageBuffer.append("&nbsp;&nbsp;");

        // 뒤에 페이지가 더 있는경우
        if (getTotalPageByPage() > endOfPage) {
            movoToPage = endOfPage + 1;
            pageBuffer.append("<a href='"+list_url+token+"currentPage="+movoToPage+"'>");
        }
        pageBuffer.append("[다음10개]</a>&nbsp;&nbsp;");
        pageBuffer.append("<a href='"+list_url+token+"currentPage="+endOfPage+"'>[마지막]</a>");

        return pageBuffer.toString();
    }



    // 수정된 버전 : 모든 페이지 이동(한글 검색 페이지 포함)은 moveTo() 자바스크립트로 POST 방식으로 넘긴다.
    // 수정일 : 2005.05.06
    public String pageList() {

        StringBuffer pageBuffer = new StringBuffer();

        int startOfPage;    // 화면 하단에 보여질 시작 페이지 번호
        int endOfPage;      // 화면 하단에 보여질 마지막 페이지 번호
        int movoToPage;     // 이동하고자 하는 페이지 번호

        //시작 페이지 번호 구하기
        startOfPage = getIndexOfStartPage();

        //마지막 페이지 번호 구하기
        endOfPage = getIndexOfEndPage();

        // 총 페이지 수가 계산된 마지막페이지 번호보다 작을경우
        // 총 페이지 수가 마지막페이지 번호가 됨
        if (getTotalPageByPage() <= endOfPage) {
            endOfPage = getTotalPageByPage();
        }
        
        pageBuffer.append("<table border='0' cellspacing='0' cellpadding='0'>");
        pageBuffer.append("<tr>");
        
        // 맨처음으로..
        pageBuffer.append("<td><a href=javascript:movePage('1')><img src='/images/btn_prevend.gif' border='0'></a></td>");

        // 이전10개...
        if (getCurrentPage() > getPageSize()) {
            movoToPage = startOfPage - getPageSize();
            //movoToPage = startOfPage - 1;
            pageBuffer.append("<td><a href=javascript:movePage('"+movoToPage+"')><img src='/images/btn_prev.gif' border='0'></a></td>");
        }else{
            pageBuffer.append("<td><img src='/images/btn_prev.gif' border='0'></a></td>");
        }

        // 시작페이지 번호부터 마지막페이지 번호까지 화면에 표시
        movoToPage = startOfPage;
        
        if(endOfPage > 0){
            while (movoToPage <= endOfPage) {
                if (movoToPage == getCurrentPage()) {
                    pageBuffer.append("<td width='20' align='center' class='num'><b>"+getCurrentPage()+"</b></td>");
                } else {
                    pageBuffer.append("<td width='20' align='center' class='num'><a href=javascript:movePage('"+movoToPage+"')>"+movoToPage+"</a></td>");
                }
                movoToPage++;
            }
        }else{
            pageBuffer.append("<td width='20' align='center' class='num'><b>"+getCurrentPage()+"</b></td>");
        }

        // 다음10개...
        // 뒤에 페이지가 더 있는경우
        if (getTotalPageByPage() > endOfPage) {
            movoToPage = endOfPage + 1;
            pageBuffer.append("<td><a href=javascript:movePage('"+movoToPage+"')><img src='/images/btn_next.gif' border='0'></a></td>");
        }else{
            pageBuffer.append("<td><img src='/images/btn_next.gif' border='0'></a></td>");
        }
        
        // 맨마지막으로...
        pageBuffer.append("<td><a href=javascript:movePage('"+getTotalPageByPage()+"')><img src='/images/btn_nextend.gif' border='0'></a></td>");

        pageBuffer.append("</tr>");
        pageBuffer.append("</table>");
        
        return pageBuffer.toString();
    }
}
