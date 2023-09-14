package net.softsociety.running_mate.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class BlogVo {
	private String title;
	private String content;
}
