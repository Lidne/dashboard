import requests
from bs4 import BeautifulSoup


def news_list(from_data=None, to_data="", count_new=0) -> list[dict]:
    """возвращает словарь списков новостей (название и ссылку)"""
    count = 1
    stop = 0
    news = []
    count_page = 0
    number_page = 1
    link_main = "https://smart-lab.ru"

    # количество страниц с новостями
    if to_data:
        to_data = f"/to_{to_data}"
    link = f"https://smart-lab.ru/calendar/index/country_0/from_{from_data}{to_data}"
    responce = requests.get(link).text
    soup = BeautifulSoup(responce, "lxml")
    block = soup.find("div", id="content")
    # если нету новостей, то выполняется следующий if
    if not block.find("table", class_="simple-little-table trades-table events"):
        news.append(
            {
                "title": "NOT FOUND",
                "link": "к сожалаению, нет новостей за данные период времени",
            }
        )
        return news
    if not block.find("div", id="pagination"):
        count_page = 1
    if block.find("div", id="pagination"):
        x = block.find_all("a", class_="page gradient last")[1].get("href")
        pos = x.find("page")
        b = x[pos::].rstrip("/")
        count_page = int(b[4::])

    # проход по всем страницам и добавление всех новостей в словарь
    for i in range(count_page):
        if stop == 1:
            break
        link = f"https://smart-lab.ru/calendar/index/country_0/from_{from_data}{to_data}/page{number_page}/"
        responce = requests.get(link).text
        soup = BeautifulSoup(responce, "lxml")
        block = soup.find("div", id="content")
        block_2 = block.find("table", class_="simple-little-table trades-table events")
        len_new = block_2.find_all("tr")
        for j in range(1, len(len_new)):
            if (count <= count_new) or (count_new == 0):
                block_3 = block_2.find_all("tr")[j]
                block_4 = block_3.find_all("td")[2]
                block_data = block_3.find_all("td")[0]
                # добавление новости без ссылки
                if not block_4.find("a"):
                    news.append(
                        {"data": block_data.text, "title": block_4.text.strip(), "link": ""}
                    )
                    count += 1
                    continue
                # добавление новости с ссылкой
                link_new = block_4.find("a").get("href")
                text_new = block_4.find("a").text
                news.append(
                    {"data": block_data.text, "title": text_new, "link": link_main + link_new}
                )
                count += 1
            else:
                stop = 1
                break
        number_page += 1
    return news


def main():
    return


if __name__ == "__main__":
    main()
