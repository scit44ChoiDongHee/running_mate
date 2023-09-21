package net.softsociety.running_mate.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListDataResponse<T> extends BaseResponse {
	private List<T> data; // 리스트 형태 데이터
}
