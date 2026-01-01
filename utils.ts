import { normalizePath, type App, type TFile, type WorkspaceLeaf } from "obsidian";
import {books} from "books.json"
export function getActualBiblePlan(id:number){
    let i = 1;
    let bookId = 0;
    for(const book of books){
        bookId++;
        let cChapter = 0;
        if(!book.plan) continue
        for(const chapterCount of book.plan){
            if(id === i){
                return {text:`${book.name} ${cChapter + 1}`+(chapterCount > 1 ? `-${cChapter + chapterCount}` : ''),link:`https://wol.jw.org/ru/wol/b/r2/lp-u/nwtsty/${bookId}/${cChapter + 1}`};
            }
            cChapter += chapterCount;
            i++;
        }

    }
}